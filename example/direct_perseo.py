import requests
import random
import time

# Replace with your Perseo CEP endpoint

PERSEO_URL = "http://localhost:9090/perseo/api/v1/rules/notify"  
HEADERS = {"Content-Type": "application/json"}

while True:
    temp = random.randint(25, 35)
    event = {"type": "iotEvent", "temperature": temp}
    response = requests.post(PERSEO_URL, json=event, headers=HEADERS)
    print(f"Sent event: {event}, response status: {response.status_code}")
    time.sleep(1)