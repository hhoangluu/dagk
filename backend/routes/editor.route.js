var express = require('express');
var router = express.Router();

const editorcontroller = require('../controllers/editor.controller');


router.route('')
    .get(editorcontroller.index);

    router.route('/accept')
    .post(editorcontroller.acceptArticle);
    router.route('/refuse')
    .post(editorcontroller.refuseArticle);
router.route('/:item')
    .get(editorcontroller.loadItem);




module.exports = router;