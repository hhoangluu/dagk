var express = require('express');
var router = express.Router();

const accountcontroller = require('../controllers/account.controller');


router.get('/register', (req, res, next) => {
    res.render('vwAccount/register');
})
router.get('/login', (req, res, next) => {
    res.render('vwAccount/login');
})
router.route('/register')
    .post(accountcontroller.register);


module.exports = router;