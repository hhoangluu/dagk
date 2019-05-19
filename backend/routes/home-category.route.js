var express= require('express');
var router = express.Router();

const homepagecontroller = require('../controllers/homepagecontroller');

router.route('')
    .get(homepagecontroller.index);


module.exports = router;