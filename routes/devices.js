const express = require('express');
const router = express.Router();
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
router.post('/update', (req, res) => {

    console.log(req.body.deviceId);

    let location = req.body.location;
    console.log(location);

    const device = new Device({
        _id: req.body.deviceId,
        battery: req.body.battery,
        location: {type: location.type, 
                   coordinates: [location.coordinates[0], 
                                 location.coordinates[1]
                                ]
                  }
    });

    device.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err })
    })
    
});

module.exports = router;