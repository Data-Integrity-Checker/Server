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

        const respond = await Device.updateOne({ _id: oldDevice._id }, changes);
        DeviceService.save(update, res);

        res.send(d1.getTime() + " " + d2.getTime());
    }
});

module.exports = router;