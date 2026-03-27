# LAS-NoCode Rule Editor - Example: High Temperature Rule Deployment

This example demonstrates how to use the LAS-NoCode Rule Editor (LAS) to create and deploy a simple Complex Event Processing (CEP) rule for IoT systems, using **FIWARE Orion Context Broker** and **Perseo CEP**.

It illustrates a **fully reproducible workflow** for rule creation, EPL generation, deployment, and event execution, without requiring physical sensors.

---

## Scenario

**Objective:** Define a rule that triggers an alert when a temperature value exceeds 30°C. The rule is created in LAS, deployed to Perseo CEP, and executed when Orion sends events.

- **Input:** Events sent to Orion Context Broker by AgentJSON or simulated sources  
- **CEP Rule:** If `temperature > 30`, trigger an alert  
- **Output:** Perseo CEP executes the rule and generates the alert

---

## 1. Creating the Rule in LAS Editor

In the editor, create a rule using blocks:

[Condition: TEMPERATURE > 30] ---> [Action: GENERATE ALERT]


- **Condition Block:** defines the threshold for temperature  
- **Action Block:** specifies the action executed by Perseo CEP when the condition is met  

Once the rule is complete, click **“Generate EPL”** to automatically generate the EPL and deploy the rule to Perseo CEP.

---


## 2. Generated EPL

The editor generates the following EPL:

```sql
SELECT temperature!
FROM iotEvent
WHERE temperature! > 30
```
Perseo CEP executes this rule when it receives notifications from Orion Context Broker.


## 3. Event Flow Overview

The full event flow is:

1. IoT sensors or simulation scripts send events to Orion via AgentJSON

2. Orion Context Broker receives events and triggers its subscription

3. Perseo CEP receives the notification from Orion and evaluates the rule created in LAS

4. Alerts are triggered if the condition is met

This workflow demonstrates rule creation and deployment without the editor handling sensor events directly.


## 4. Optional Python Simulation Script

To test the workflow without real sensors, you can use a Python script to send events to Orion:

```python
import requests
import random
import time

# Replace with your Orion Context Broker endpoint
ORION_URL = "http://localhost:1026/v2/entities/Room1/attrs"

HEADERS = {"Content-Type": "application/json",
           "fiware-service": "titania", # change this to your FIWARE service
           "fiware-servicepath": "/"} # adjust service path if needed

i = 1
while i < 3 :
    temp = random.randint(25, 35)

    event = {
        "data": [
            {
                "id": "Room1",
                "type": "Room",
                "temperature": {
                    "type": "Number",
                    "value": temp
                }
            }
        ],
        "subscriptionId": "simulated-sent-event"
    }

    response = requests.patch(ORION_URL, json=event, headers=HEADERS)
    print(f"Sent event: {payload}, response status: {response.status_code}")
    i+= 1
    time.sleep(1)
```

* Sends random temperature readings to Orion

* Perseo CEP evaluates the rule and generates alerts if temperature! > 30


## 5. Expected Output

```yaml
time=2026-02-22T03:49:33.985Z | lvl=INFO | corr=7fe63ee4-0fa1-11f1-8d3f-a20024534928 | trans=1771729386-998-00000000051 | from=172.19.0.6 | srv=titania | subsrv=/ | comp=Orion | op=logTracing.cpp[211]:logInfoRequestWithPayload | msg=Request received: POST /v2/entities?options=upsert, request payload (217 bytes): {"id":"Tank:tank:001","type":"Tank","l":{"type":"Text","value":28,"metadata":{"TimeInstant":{"type":"DateTime","value":"2026-02-22T03:49:33.121Z"}}},"TimeInstant":{"type":"DateTime","value":"2026-02-22T03:49:33.121Z"}}, response code: 204


time=2026-02-22T04:33:08.450Z | lvl=INFO | corr=95f525be-0fa7-11f1-ba28-a20024534928 | trans=1771729386-998-00000000099 | from=172.19.0.6 | srv=titania | subsrv=/ | comp=Orion | op=logTracing.cpp[211]:logInfoRequestWithPayload | msg=Request received: POST /v2/entities?options=upsert, request payload (218 bytes): {"id":"Tank:tank:001","type":"Tank","l":{"type":"Text","value":32,"metadata":{"TimeInstant":{"type":"DateTime","value":"2026-02-22T04:33:06.838Z"}}},"TimeInstant":{"type":"DateTime","value":"2026-02-22T04:33:06.838Z"}}, response code: 204


time=2026-02-22T04:32:49.332Z | lvl=INFO | corr=8a5025c4-0fa7-11f1-b284-a20024534928 | trans=1771729386-998-00000000097 | from=172.19.0.6 | srv=titania | subsrv=/ | comp=Orion | op=logTracing.cpp[211]:logInfoRequestWithPayload | msg=Request received: POST /v2/entities?options=upsert, request payload (218 bytes): {"id":"Tank:tank:001","type":"Tank","l":{"type":"Text","value":27,"metadata":{"TimeInstant":{"type":"DateTime","value":"2026-02-22T04:32:47.252Z"}}},"TimeInstant":{"type":"DateTime","value":"2026-02-22T04:32:47.252Z"}}, response code: 204
```

Alerts can be logged or stored via Perseo CEP actions.


## 6. Instructions for Use

1. Run Orion Context Broker and Perseo CEP (Docker recommended)

2. Open LAS-NoCode Rule Editor (Docker or Docker Compose)

3. Create a new rule: define the condition and action blocks

4. Click “Generate EPL” to deploy the rule to Perseo CEP

5. Send test events to Orion (via AgentJSON or the provided Python simulation script)

6. Observe alerts generated by Perseo CEP


### Notes

* This example demonstrates the rule creation and deployment workflow: LAS Editor → Perseo CEP → Orion Context Broker

* Fully reproducible using Docker and optional Python scripts

* Ideal for testing, teaching, and demonstrating IoT event processing with FIWARE components