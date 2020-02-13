import requests
import json
import time

url = 'http://localhost:3000/post/update'

with open('data/01-27-2020.json', 'r') as myfile:
    data=myfile.read()

# Getting updates from devices
updates = json.loads(data)

# Sending data
for i in range(len(updates)-1):
    seconds = updates[i+1]["timestamp"] - updates[i]["timestamp"]
    responce = requests.post(url, data = updates[i])
    time.sleep(seconds)
    print(responce.text)

responce = requests.post(url, data = updates[len(updates)-1])