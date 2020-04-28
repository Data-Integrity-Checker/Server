const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

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
    updates: [String],
});

module.exports = mongoose.model('Alert', AlertSchema);