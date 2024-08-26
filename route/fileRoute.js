const express = require('express');
const { postFiles,getFilesByUserId } = require('../controller/fileController');
const {multer,storage}= require('../middleware/multerConfig');
const upload = multer({storage:storage})
const router = express.Router()
router.route('/file').post(upload.array('file'),postFiles)
router.route('/file/:userId').get(getFilesByUserId)

module.exports = router;