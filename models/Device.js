const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const DeviceSchema = mongoose.Schema({
    _id : {
        type: String,
        require: true
    },
    battery: {
        type: SchemaTypes.Double,
        require: true
    },
    performance: {
        type: SchemaTypes.Double,
        default: 1.0
    },
    duplicate_data: {
        type: Number,
        default: 0
    },
    missing_data_errors: {
        type: Number,
        default: 0
    },
    gps_errors: {
        type: Number,
        default: 0
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Device', DeviceSchema);