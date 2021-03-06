import requests
import json
import time

url = 'http://localhost:3000/updates/record'

with open('data/01-27-2020.json', 'r') as myfile:
    data=myfile.read()

# Getting updates from devices
updates = json.loads(data)
headers = {'content-type': 'application/json'}

count = 100

# Sending data
for i in range(len(updates)-1):
    seconds = updates[i+1]["timestamp"] - updates[i]["timestamp"]
    responce = requests.post(url, data=json.dumps(updates[i]), headers=headers)
    print(responce.text)
    count -= 1
    if count < 0:
        time.sleep(seconds/5)

responce = requests.post(url, data = updates[len(updates)-1])
