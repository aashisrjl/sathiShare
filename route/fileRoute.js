const express = require('express');
const { postFiles,getFilesByUserId, deleteFile,  renderEmail, sendmail, handleSearch, getMyFiles } = require('../controller/fileController');
const {multer,storage}= require('../middleware/multerConfig');
const { errorHandler } = require('../middleware/errorHandler');
const upload = multer({storage:storage})
const router = express.Router()
router.route('/file').post(upload.array('file'),errorHandler(postFiles))
router.route('/file/:userId').get(errorHandler(getFilesByUserId))
router.route('/file/delete/:id').get(errorHandler(deleteFile))
router.route('/file/email/:file').get(errorHandler(renderEmail))
router.route('/file/send/:file').post(errorHandler(sendmail))
router.route('/search/:id').get(errorHandler(handleSearch))

router.route('/myfiles').get(errorHandler(getMyFiles))

module.exports = router;