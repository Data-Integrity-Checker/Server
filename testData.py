import requests
import json
import time

files = ["01-27-2020.json", "01-29-2020.json", "01-31-2020.json", "02-02-2020.json", "01-28-2020.json", "01-30-2020.json", "02-01-2020.json"]

for f in files:
	with open("data/" + f, 'r') as myfile:
		data=myfile.read()

# Getting updates from devices
	updates = json.loads(data)
	headers = {'content-type': 'application/json'}

	count = 0
	m = {}

# Sending data
	for i in range(len(updates)-1):
			
		id = updates[i]["deviceId"]

		if id in m.keys():
			if abs(updates[i]["timestamp"] - m[id]["time"]) != 10:
				m[id]["count"] += 1 
				print(f)
				print(updates[i])
				print(m[id]["update"])	
			else:
				m[id]["timestamp"] = updates[i]["timestamp"]
		else:
			m[id] = {"time": updates[i]["timestamp"], "count": 0, "update": updates[i]}
			
	for key in m:
		print(key,  m[key]["count"])
