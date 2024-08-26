const express = require('express');
const { chat } = require('../controller/chatController');
const router = express.Router()
router.route('/chat').post().get(chat)

module.exports = router;