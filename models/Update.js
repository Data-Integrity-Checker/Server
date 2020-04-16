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
    performance: [String],
    duplicate_data: [String],
    missing_data_errors: {
        start: String,
        end: String,
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