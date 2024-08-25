const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    file: {
        type: String,
        trim: true
    },
    ipAddress: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', fileSchema);
module.exports = File;

