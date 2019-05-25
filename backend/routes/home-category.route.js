var express = require('express');
var router = express.Router();

const homepagecontroller = require('../controllers/homepagecontroller');


router.route('')
    .get(homepagecontroller.index);

router.route('/:category')
    .get(homepagecontroller.categories);

router.route('/:category/:childCategory')
    .get(homepagecontroller.childCategories);




module.exports = router;