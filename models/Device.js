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
    battery_history: [
        {
            percent: {
                type: SchemaTypes.Double,
            },
            time: {
                type: Date,
                default: Date.now
            }

        },
    ], 
    last_update_id: {
        type: String,
        required: true
    },
    last_update_time: {
        type: Date,
        required: true
    },
    duplicate_data: [String],
    missing_data: [String],
    gps_errors: [String],
});

module.exports = mongoose.model('Device', DeviceSchema);