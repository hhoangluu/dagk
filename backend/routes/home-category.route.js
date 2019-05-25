var express = require('express');
var router = express.Router();

const homepagecontroller = require('../controllers/homepagecontroller');


router.route('')
    .get(homepagecontroller.index);

router.route('/:a')
    .get(homepagecontroller.categories);

router.route('/:a/:a')
    .get(homepagecontroller.categories);




module.exports = router;