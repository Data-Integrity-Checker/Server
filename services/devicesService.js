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

function distance(oldCoord, updateCoord) {

    let lat1 = oldCoord[0];
    let lon1 = oldCoord[1];
    let lat2 = updateCoord[0];
    let lon2 = updateCoord[1];

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        
        if (dist > 1) {
			dist = 1;
        }
        
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344
		return dist/1000;//from kilometer to meter
    }
    
}

module.exports.createDevice = createDevice;
module.exports.save = save;
module.exports.getDevice = getDevice;
module.exports.createAlert = createAlert;
module.exports.distance = distance;