const express = require('express');
const router = express.Router()
router.route('/chat').post().get()

module.exports = router;