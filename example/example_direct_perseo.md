# LAS-NoCode Rule Editor - Example: Direct Perseo CEP Event Trigger

This example demonstrates how to use the LAS-NoCode Rule Editor to create a **rule and trigger it directly via Perseo CEP** using Python. No Orion Context Broker is required.

---

## Scenario

**Objective:** Define a rule that triggers an alert when a temperature value exceeds 30°C. The rule is created in LAS, deployed to Perseo CEP, and triggered by sending events directly to Perseo via its REST API.

- **Input:** Events sent directly to Perseo CEP using Python  
- **CEP Rule:** If `temperature > 30`, trigger an alert  
- **Output:** Perseo CEP executes the rule and produces the alert

---

## 1. Creating the Rule in LAS Editor

In the editor, create a rule using blocks:

[Condition: temperature! > 30] ---> [Action: GENERATE ALERT FOR EMAIL]

- **RULE:** defines the rule name  
- **WHERE Block:** sets the temperature threshold  
- **Action Type Block:** specifies the action that Perseo CEP executes when the condition is met  
- **EMAIL Block:** defines the configuration for sending the email alert

Click **“Generate EPL”** to deploy the rule to Perseo CEP via the editor’s API.

---

## 2. Generated EPL

```sql
SELECT temperature!
FROM iotEvent
WHERE temperature! > 30
```
Perseo CEP will evaluate this rule for every event sent to its API.

## 3. Python Simulation Script: Direct Event Posting

Create a file simulate_perseo.py:

```python
import requests
import random
import time

# Replace with your Perseo CEP endpoint

PERSEO_URL = "http://localhost:9090/perseo/api/v1/rules/notify"  
HEADERS = {"Content-Type": "application/json",
           "fiware-service": "titania", 
           "fiware-servicepath": "/"}

while True:
    temp = random.randint(25, 35)
    event = {"type": "iotEvent", "temperature": temp}
    response = requests.post(PERSEO_URL, json=event, headers=HEADERS)
    print(f"Sent event: {event}, response status: {response.status_code}")
    time.sleep(1)
```

* Sends random temperature readings directly to Perseo CEP

* If temperature > 30, the rule created in LAS will trigger the alert

## 4. Expected Output

```yaml
Sent event: {'type': 'iotEvent', 'temperature': 28}, response status: 200
Sent event: {'type': 'iotEvent', 'temperature': 32}, response status: 200
ALERT: High temperature detected!
Sent event: {'type': 'iotEvent', 'temperature': 27}, response status: 200
```

Alerts are logged by Perseo CEP based on the deployed rule.

## 5. Instructions for Use

1. Run Perseo CEP (Docker recommended)

2. Open LAS-NoCode Rule Editor (Docker or Docker Compose)

3. Create a new rule: define the condition and action blocks

4. Click “Generate EPL” to deploy the rule to Perseo CEP

5. Run simulate_perseo.py to send events directly to Perseo CEP

6. Observe alerts generated according to the rule

## Notes

* This example demonstrates direct interaction with Perseo CEP without using Orion Broker

* Fully reproducible using Docker and Python scripts

* Ideal for testing, teaching, or demonstrating CEP event handling in IoT systems