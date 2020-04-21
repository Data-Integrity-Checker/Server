const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Device = require('../models/Device');
const Update = require('../models/Update');

function createDevice(body){
    return new Device({
        _id: body.deviceId,
        battery: body.battery,
        location: {type: body.location.type, 
                   coordinates: [body.location.coordinates[0], 
                                body.location.coordinates[1]
                                ]
                  }
    });
}
async function saveDevice(device, res){
    const repond = await device.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err })
    })
}

async function saveUpdate(update, res){
    const repond = await update.save()
    .then(data => {
        res.json(data);
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

module.exports.createDevice = createDevice;
module.exports.saveDevice = saveDevice;
module.exports.saveUpdate = saveUpdate;
module.exports.getDevice = getDevice;
