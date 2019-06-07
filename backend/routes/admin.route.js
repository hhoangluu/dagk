var express = require('express');
var router = express.Router();

const admincontroller = require('../controllers/admin.controller');


router.route('')
    .get(admincontroller.index);

router.route('/:item')
    .get(admincontroller.loadItem);




module.exports = router;