const express = require('express');
const { renderTextPage, createText, getAllText, getSingleText } = require('../controller/textController');
const router = express.Router()
router.route('/text').post(createText).get(renderTextPage)
router.route('/text/:userId').get(getAllText)
router.route('/text/single/:id').get(getSingleText)

module.exports = router;