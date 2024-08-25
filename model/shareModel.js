const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareSchema = new Schema({
    title: {
        type: String,
        required: true,      // Ensures that a title is always provided
        trim: true           // Trims any leading or trailing whitespace
    },
    text: {
        type: String,
        trim: true           // Trims any leading or trailing whitespace
    },
    ipAddress: {
        type: String,
        required: true,      // Ensures that the IP address is always recorded
        trim: true           // Trims any leading or trailing whitespace
    },
    timestamp: {
        type: Date,
        default: Date.now    // Automatically records the time of the share
    }
});

const Share = mongoose.model('Share', shareSchema);
module.exports = Share;
