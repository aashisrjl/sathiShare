const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    name: {
        type: String,
        required: true,      // Makes the name field mandatory
        trim: true           // Removes any leading or trailing spaces
    },
    message: {
        type: String,
        required: true,      // Makes the message field mandatory
        trim: true           // Removes any leading or trailing spaces
    },
    timestamp: {
        type: Date,
        default: Date.now    // Automatically sets the current date and time
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
