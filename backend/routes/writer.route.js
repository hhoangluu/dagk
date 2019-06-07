var express = require('express');
var router = express.Router();

const writercontroller = require('../controllers/writer.controller');


router.route('')
    .get(writercontroller.index);

router.route('/:item')
    .get(writercontroller.loadItem);




module.exports = router;