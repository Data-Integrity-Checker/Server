const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');
const Update = require('../models/Update');
const Alert = require('../models/Alert');
const DeviceService = require('../services/devicesService');

//function for calculating distance between two points
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344
		return dist/1000;//from kilometer to meter
	}
}
// Get All Devices
router.get('/allDevices', async (req, res) => {
    try{
        const devices = await Device.find();
        res.json(devices);
    } catch(error){
        res.json({ message: err });
    }
});

router.get('/allUpdates', async (req, res) => {
    try{
        const updates = await Update.find();
        res.json(updates);
    } catch(error){
        res.json({ message: err });
    }
});

router.get('/allAlerts', async (req, res) => {
    try{
        const alerts = await Alert.find();
        res.json(alerts);
    } catch(error){
        res.json({ message: err });
    }
});

// Get Device ID
router.get('/:deviceId', async (req, res) => {
    try{
        console.log(req.params.deviceId);
        const device = await Device.findById(req.params.deviceId);
        res.json(device);
    } catch(error){
        res.json({ message: err });
    }
});


// Update Device
router.patch('/:deviceId', async (req, res) => {
    try{
        const updateDevice = await Device.updateOne(
            { _id: req.params.postId }, 
            {$set: {battery: 2}
        })
        res.json(updateDevice);
    } catch(error){
        res.json({ message: err });
    }
});

// Save Device
router.post('/update', async (req, res) => {

    let update = new Update(req.body);
    let oldDevice = await DeviceService.getDevice(req.body.deviceId, res);

    // Creating device if is not in the database
    if(!oldDevice){
        const device = DeviceService.createDevice(req.body);
        DeviceService.save(device, res);
        DeviceService.save(update, res);
        console.log("Device Created");
        res.send("Device Created");
    }else{

        let changes = { last_update_time : update.timestamp,
                        last_update_id: update._id};
    
        // Updating battery
        if(oldDevice.battery != req.body.battery){
            changes["battery"] = req.body.battery;
            changes["battery_history"] = [...oldDevice.battery_history, {percent: req.body.battery, time: req.body.timestamp}];
        }

        const d1 = new Date(oldDevice.last_update_time)
        const d2 = new Date(req.body.timestamp)

        console.log(oldDevice._id);

        // Checking for data duclication
        if(d1.getTime() == d2.getTime()){
            const alert = DeviceService.createAlert("duplicate_data", oldDevice, req.body);
            changes["duplicate_data"] = [...oldDevice.duplicate_data, alert._id];
            DeviceService.save(alert, res);
        }

        // Missing data
        if(d2.getTime() - d1.getTime() > 10){
            const alert = DeviceService.createAlert("missing_data", oldDevice, req.body);
            changes["missing_data"] = [...oldDevice.missing_data, alert._id];
            DeviceService.save(alert, res);
        }

        // GPS Error 
        
        distanceBetween = distance(oldDevice.body.location.coordinates[0], oldDevice.body.location.coordinates[1], eq.body.location.coordinates[0], eq.body.location.coordinates[1])

        if(distance>=30){
            changes["gps_errors"]=req.body.location; //change to what to save for errors
            console.log("GPS Error: Distance traveled " + distanceBetween + " meters");
        }

        //Old code used
        // if(oldDevice.location === req.body.location){
        //     changes["gps_errors"]=req.body.location; //change to what to save for errors
        // }
        // if(!((oldDevice.body.location.coordinates[0]+0.000500)>=req.body.location.coordinates[0]>=(oldDevice.body.location.coordinates[0]-0.000500))){
        //     changes["gps_errors"]=req.body.location; //change to what to save for errors
        // }
        // if(!((oldDevice.body.location.coordinates[1]+0.000500)>=req.body.location.coordinates[1]>=(oldDevice.body.location.coordinates[1]-0.000500))){
        //     changes["gps_errors"]=req.body.location; //change to what to save for errors
        // }


        const respond = await Device.updateOne({ _id: oldDevice._id }, changes);
        DeviceService.save(update, res);

        res.send(d1.getTime() + " " + d2.getTime());
    }
});

module.exports = router;
