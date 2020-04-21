const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const UpdateSchema = mongoose.Schema({
    _id : {
        type: String,
        require: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    battery : {
        type: SchemaTypes.Double,
        require: true
    },
    deviceId : {
        type: String,
        require: true
    },
    timestamp : {
        type: Date,
        require: true
    },
    signalStrength : {
        type: SchemaTypes.Double,
        require: true
    },
    dataType : {
        type: String,
        require: true
    },
    __v : {
        type: SchemaTypes.Double,
        require: true
    },
});

module.exports = mongoose.model('Update', UpdateSchema);