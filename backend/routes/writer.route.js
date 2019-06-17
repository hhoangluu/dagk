var express = require('express');
var router = express.Router();

const writercontroller = require('../controllers/writer.controller');


router.route('')
    .get(writercontroller.index);

router.route("/writer-addpost")
    .post(writercontroller.addpost);
    router.route('/delete')
    .post(writercontroller.removePost);

router.route('/:item')
    .get(writercontroller.loadItem);




module.exports = router;