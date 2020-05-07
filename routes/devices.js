const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');

// Get All Devices
router.get('/all', async (req, res) => {
    try{
        const devices = await Device.find();
        res.json(devices);
    } catch(error){
        res.json({ message: err });
    }
});

// Get device by ID
router.get('/:deviceId', async (req, res) => {
    try{
        console.log(req.params.deviceId);
        const device = await Device.findById(req.params.deviceId);
        res.json(device);
    } catch(error){
        res.json({ message: err });
    }
});

module.exports = router;