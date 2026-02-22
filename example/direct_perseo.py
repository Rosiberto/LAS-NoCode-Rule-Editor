import requests
import random
import time

# Replace with your Perseo CEP endpoint

PERSEO_URL = "http://localhost:9090/notices"  
HEADERS = {"Content-Type": "application/json",
           "fiware-service": "titania", 
           "fiware-servicepath": "/"}

i=1
while i<3:
    temp = random.randint(39, 45)

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

    response = requests.post(PERSEO_URL, json=event, headers=HEADERS)
    print(f"Sent event: {event}, response status: {response.status_code}")
    i+= 1
    time.sleep(1)