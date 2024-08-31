const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  ipAddress: {
    type: String
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    default: 'Unknown' // Default value if userName is not provided
  },
  socketId: {
    type: String
  }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
