const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

//Save Battery
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

//needs call from class catching data
function duplicateData(id){
    //simple error catch
    if (err) throw err; 
//Checks if data exists, if so inc 1
if(Device.collection("_id").find(id)==true){
    db.Device.update(
        {_id: id},
        {$inc: {duplicateData: +1}}//convert to int instead of string
        )
        //add feature to save which entry was a duplicate
}
}

//needs call from class catching data, pass entry id
function dupData(id){
    //simple error 
    if (err) throw err; 
//Checks if data entree exists, if so inc 1
if(Device.collection("_id").find(id)==true){
    db.Device.update(
        {_id: id},
        {$inc: {duplicateData: +1}}
        )
}
}

//call every 10 seconds, check to see if better fit in with device.js
function lossData(deviceId){
    let the_interval = 10000; //10sec
setInterval(async function() {
    try {
        await Device.updateOne();//checks every 10 seconds if updated
    } catch (e) {
        // console.log("10 sec check error:", e);
        //updates data loss if not updated
        b.Device.update(
            {_id: deviceId},
            {$inc: {missing_data_errors: +1}}
            )
    }
}, the_interval);
}


module.exports = router;

