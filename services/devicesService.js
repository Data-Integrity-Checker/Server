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

    console.log(new Date(update.timestamp));
    
    let data = {
        deviceId: update.deviceId,
        name: name,
        updates: [oldDevice.last_update_id, update._id],
        start: new Date(oldDevice.last_update_time),
        end: new Date(update.timestamp)
    }

    if(name == "gps_errors"){
        data["distance"] = oldDevice.distance;
    }

    return new Alert(data);
}


function distance(oldCoord, updateCoord) {
    let R = 6371e3; // R is earth’s radius
    let lat1 = oldCoord[0];
    let lon1 = oldCoord[1];
    let lat2 = updateCoord[0];
    let lon2 = updateCoord[1];
    let lat1radians = toRadians(lat1);
    let lat2radians = toRadians(lat2);

    let latRadians = toRadians(lat2-lat1);
    let lonRadians = toRadians(lon2-lon1);

    let a = Math.sin(latRadians/2) * Math.sin(latRadians/2) +
            Math.cos(lat1radians) * Math.cos(lat2radians) *
            Math.sin(lonRadians/2) * Math.sin(lonRadians/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c;

    return d;
}

function toRadians(val){
    let PI = 3.1415926535;
    return val / 180.0 * PI;
}

module.exports.createDevice = createDevice;
module.exports.save = save;
module.exports.getDevice = getDevice;
module.exports.createAlert = createAlert;
module.exports.distance = distance;