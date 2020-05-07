const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Alert = require('../models/Alert');

const send = require('gmail-send')({
    user: 'capstonecsumbtest@gmail.com',
    pass: 'Daniel123!',
    to:   'danmorales@csumb.edu',
    subject: 'Data Integrity Checker Investigate Alert',
});

// Investigate Alert
router.get('/investigate/:alertId', (req, res) => {

    send({
        text: 'ID number: ' + req.params.alertId,  
    }, (error, result, fullResult) => {
        console.log(result);
        if (error) {
            res.json({ error });
        }
        else {
            res.json({ result });
        }
        
    })
});

// Get all alrts
router.get('/all', async (req, res) => {

    try{
        const alerts = await Alert.find();
        res.json(alerts);
    } catch(error){
        res.json({ message: err });
    }
});

// Get Device ID
router.get('/:deviceId', async (req, res) => {

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
router.get('/:alertType/:deviceId', async (req, res) => {
    try{
        const alerts = await Alert.find({ 
                'name' : req.params.alertType,
                'deviceId':  req.params.deviceId
            });
        res.json(alerts);
    } catch(error){
        res.json({ message: err });
    }
});

module.exports = router;