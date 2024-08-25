const express = require('express');
const { postFile, getAllFile } = require('../controller/fileController');
const {multer,storage}= require('../middleware/multerConfig');
const upload = multer({storage:storage})
const router = express.Router()
router.route('/file').post(upload.single('file'),postFile).get(getAllFile)

module.exports = router;