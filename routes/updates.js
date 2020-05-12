const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');
const Update = require('../models/Update');
const DeviceService = require('../services/devicesService');

router.get('/all', async (req, res) => {
    try{
        const updates = await Update.find();
        res.json(updates);
    } catch(error){
        res.json({ message: err });
    }
});

router.get('/:updateId', async (req, res) => {
    try{
        console.log(req.params.updateId);
        const update = await Update.findById(req.params.updateId);
        res.json(update);
    } catch(error){
        res.json({ message: err });
    }
});

// Save update
router.post('/record', async (req, res) => {

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
        if(distance >= 1000){
            oldDevice["distance"] = distance;
            const alert = DeviceService.createAlert("gps_errors", oldDevice, req.body);
            changes["gps_errors"] = [...oldDevice.gps_errors, alert._id];
            DeviceService.save(alert, res);
        }

        // Updating device
        const respond = await Device.updateOne({ _id: oldDevice._id }, changes);

        // Saving update
        DeviceService.save(update, res);

        console.log("Updated Device: " + update.deviceId)

        res.send(update._id + " update successful");
    }
});

module.exports = router;