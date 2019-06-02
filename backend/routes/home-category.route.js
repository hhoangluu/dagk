var express = require('express');
var router = express.Router();

const homepagecontroller = require('../controllers/homepagecontroller');


router.route('')
    .get(homepagecontroller.index)
    .post(homepagecontroller.register);
router.route('/register')
.get(homepagecontroller.index)
.post(homepagecontroller.register);

router.route('/:category')
    .get(homepagecontroller.categories);

router.route('/:category/:childCategory')
    .get(homepagecontroller.childCategories);

//router.route('/:category/:childCategory/:post')
   // .get(homepagecontroller.loadPost);

    


module.exports = router;