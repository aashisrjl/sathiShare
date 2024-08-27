const express = require('express');
const { postFiles,getFilesByUserId, deleteFile } = require('../controller/fileController');
const {multer,storage}= require('../middleware/multerConfig');
const { errorHandler } = require('../middleware/errorHandler');
const upload = multer({storage:storage})
const router = express.Router()
router.route('/file').post(upload.array('file'),errorHandler(postFiles))
router.route('/file/:userId').get(errorHandler(getFilesByUserId))
router.route('/file/delete/:id').get(errorHandler(deleteFile))

module.exports = router;