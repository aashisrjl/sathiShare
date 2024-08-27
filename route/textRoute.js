const express = require('express');
const { renderTextPage, createText, getAllText, getSingleText, deleteText } = require('../controller/textController');
const { errorHandler } = require('../middleware/errorHandler');
const router = express.Router()
router.route('/text').post(errorHandler(createText)).get(errorHandler(renderTextPage))
router.route('/text/:userId').get(errorHandler(getAllText))
router.route('/text/single/:id').get(errorHandler(getSingleText))
router.route('/text/delete/:id').get(errorHandler(deleteText))

module.exports = router;