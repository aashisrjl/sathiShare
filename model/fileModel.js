const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    file: {
        type: String,
        trim: true
    },
    userId:{
        type : String
    },
    ipAddress: {
        type: String,
        required: true,
        trim: true
    },
    publicId: {
        type: String,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', fileSchema);
module.exports = File;

