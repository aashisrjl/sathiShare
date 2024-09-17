const express = require('express');
const { postFiles,getFilesByUserId, deleteFile,  renderEmail, sendmail, handleSearch } = require('../controller/fileController');
const {multer,storage}= require('../middleware/multerConfig');
const { errorHandler } = require('../middleware/errorHandler');
const upload = multer({storage:storage})
const router = express.Router()
router.route('/file').post(upload.array('file'),errorHandler(postFiles))
router.route('/:userId').get(errorHandler(getFilesByUserId))
router.route('/file/delete/:id').get(errorHandler(deleteFile))
router.route('/file/email/:file').get(errorHandler(renderEmail))
router.route('/file/send/:file').post(errorHandler(sendmail))
router.route('/search/:id').get(errorHandler(handleSearch))

module.exports = router;