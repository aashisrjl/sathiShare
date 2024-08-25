const express = require('express');
const router = express.Router()
router.route('/share').post().get()

module.exports = router;