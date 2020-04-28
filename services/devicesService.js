const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');
const Update = require('../models/Update');
const Alert = require('../models/Alert');

function createDevice(body){
    return new Device({
        _id: body.deviceId,
        battery: body.battery,
        location: {type: body.location.type, 
                   coordinates: [body.location.coordinates[0], 
                                body.location.coordinates[1]
                                ]
                  },
        battery_history: [{time: body.timestamp, percent: body.battery}],
        last_update_id : body._id,
        last_update_time: body.timestamp
    });
}

async function save(obj, res){
    const repond = await obj.save()
    .then(data => {
        return data
    })
    .catch(err => {
        res.json({ message: err })
    })
}

async function getDevice(id, res){
    const repond = await Device.findById(id)
    .then((data)=>{
        return data;
    }).catch((err)=>{
        res.json({ message: err })
    });
    return repond;
}

async function getDevice(id, res){
    const repond = await Device.findById(id)
    .then((data)=>{
        return data;
    }).catch((err)=>{
        res.json({ message: err })
    });
    return repond;
}

function createAlert(name, oldDevice, update){
    return new Alert({
        deviceId: update.deviceId,
        name: name,
        updates: [oldDevice.last_update_id, update._id]
    });
}

module.exports.createDevice = createDevice;
module.exports.save = save;
module.exports.getDevice = getDevice;
module.exports.createAlert = createAlert;