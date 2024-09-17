const express = require('express');
const { renderTextPage, createText, getAllText, getSingleText, deleteText, handleSearch } = require('../controller/textController');
const { errorHandler } = require('../middleware/errorHandler');
const router = express.Router()
router.route('/text/post/').post(errorHandler(createText)).get(renderTextPage)
router.route('/text/:userId').get(errorHandler(getAllText))
router.route('/text/single/:id').get(errorHandler(getSingleText))
router.route('/text/delete/:id').get(errorHandler(deleteText))
router.route('/search/:id').get(errorHandler(handleSearch))

module.exports = router;