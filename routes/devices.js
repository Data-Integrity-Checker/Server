const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');
const Update = require('../models/Update');
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

// Get All Devices
router.get('/allUpdates', async (req, res) => {
    try{
        const update = await Update.find();
        res.json(update);
    } catch(error){
        res.json({ message: err });
    }
});

// Updta Device
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
        DeviceService.saveDevice(device, res);
        DeviceService.saveUpdate(update, res);
        console.log("Device Created");
        res.send("Device Created");
    }else{

        let changes = { last_update : update.timestamp};
    
        // Updating battery
        if(oldDevice.battery != req.body.battery){
            changes["battery"] = req.body.battery;
            changes["battery_history"] = [...oldDevice.battery_history, {persent: req.body.battery, time: req.body.timestamp}];
        }

        // Checking for data duclication
        //if(oldDevice.timestamp === req.body.timestamp)


        console.log(oldDevice);

        const respond = await Device.updateOne({ _id: oldDevice._id }, changes);

        DeviceService.saveUpdate(update, res);

        res.send("done");
    }
});

module.exports = router;