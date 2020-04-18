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
        {$inc: {duplicateData: +1}}
        )
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

function lossData(deviceId){

}


module.exports = router;
