const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

router.post('/update', (req, res) => {

    console.log(req.body.deviceId);

    const device = new Device({
        _id: req.body.deviceId,
        battery: req.body.battery
    });

    device.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err })
    })
});

router.get('/all', async (req, res) => {
    try{
        const devicies = await Device.find();
        res.json(devicies);
    } catch(error){
        res.json({ message: err });
    }
});

module.exports = router;