var express = require('express');
var router = express.Router();

const subcribercontroller = require('../controllers/subcriber.controller');

router.route('/subcriber-info')
    .post(subcribercontroller.updateProfile);

router.route('')
    .get(subcribercontroller.index);

router.route('/:item')
    .get(subcribercontroller.loadItem);




module.exports = router;