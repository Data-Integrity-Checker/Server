const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const AlertSchema = mongoose.Schema({
    _id: { 
        type: mongoose.Schema.ObjectId, 
        auto: true 
    },
    deviceId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    distance: {
        type: SchemaTypes.Double,
        default: 0
    },
    updates: [String],
});

module.exports = mongoose.model('Alert', AlertSchema);