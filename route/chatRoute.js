const express = require('express');
const { chat } = require('../controller/chatController');
const router = express.Router()
router.route('/chat').post().get(chat)
router.route('/name')

module.exports = router;
// server crash maintain

