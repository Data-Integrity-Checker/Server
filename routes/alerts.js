const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Alert = require('../models/Alert');

const send = require('gmail-send')({
    user: 'capstonecsumbtest@gmail.com',
    pass: 'Daniel123!',
    to:   'capstonecsumbtest@gmail.com',
    subject: 'Data Integrity Checker Investigate Alert',
});

// Investigate Alert
router.get('/investigate/:alertId', async (req, res) => {

    try{
        console.log(req.params.alertId);

        const alert = await Alert.findById(req.params.alertId);

        send({
            text: 'ID number: ' + req.params.alertId + "\nType: " + alert.name + "\nDate: " + (new Date(alert.start)).toString(),  
        }, (error, result, fullResult) => {
            console.log(result);
            if (error) {
                res.json({ error });
            }
            else {
                res.json({ result });
            }
            
        })

        res.json(alert);
    } catch(error){
        res.json({ message: err });
    }
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

// Get all alrts
router.get('/battery', async (req, res) => {

    try{
        const alerts = await Alert.find();
        res.json(alerts);
    } catch(error){
        res.json({ message: err });
    }
});

// Get all alrts
router.get('/missing_data', async (req, res) => {

    Alert.find({ 'name': "missing_data" }, function (err, alerts) {
        
        if (err){
            res.json({ message: err });
        }
        else{
            res.json(alerts);
        }
    });
});

// Get all alrts
router.get('/duplicate_data', async (req, res) => {

    Alert.find({ 'name': "duplicate_data" }, function (err, alerts) {
        
        if (err){
            res.json({ message: err });
        }
        else{
            res.json(alerts);
        }
    });
});

// Get all alrts
router.get('/gps_errors', async (req, res) => {

    Alert.find({ 'name': "gps_errors" }, function (err, alerts) {
        
        if (err){
            res.json({ message: err });
        }
        else{
            res.json(alerts);
        }
    });
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