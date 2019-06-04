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
router.route('/login')
    .post(accountcontroller.login);

router.route('/is-available')
    .get(accountcontroller.isAvailable)

router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/account/login');
      });

// bao ve route
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
module.exports = router;