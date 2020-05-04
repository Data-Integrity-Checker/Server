const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');
const Update = require('../models/Update');
const Alert = require('../models/Alert');
const DeviceService = require('../services/devicesService');

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

// Get Device ID
router.get('/alerts/:deviceId', async (req, res) => {

    Alert.find({ 'deviceId': req.params.deviceId }, function (err, alerts) {
        
        if (err){
            res.json({ message: err });
        }
        else{
            res.json(alerts);
        }
    });

});

// Get specific alerts
router.get('/alertType/:alert/:deviceId', async (req, res) => {
    try{
        const alerts = await Alert.find({ 
                'name' : req.params.alert,
                'deviceId':  req.params.deviceId
            });
        console.log(alerts)
        res.json(alerts);
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

        //nconsole.log(oldDevice._id);

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
        let distance = DeviceService.distance(oldDevice.location.coordinates, req.body.location.coordinates);
        
        console.log(distance);

        if(distance > 1)
            console.log(oldDevice_id);

        // Updating device
        const respond = await Device.updateOne({ _id: oldDevice._id }, changes);

        // Saving updat4
        DeviceService.save(update, res);

        res.send(d1.getTime() + " " + d2.getTime());
    }
});

module.exports = router;