var express = require('express');
var router = express.Router();

const admincontroller = require('../controllers/admin.controller');



router.route('/admin-listuser')
    .post(admincontroller.updateProfileListUser);

router.route('/admin-info')
    .post(admincontroller.updateProfile);

router.route('/admin-addaccount')
    .post(admincontroller.register);

router.route('/is-available')
    .get(admincontroller.isAvailable)

router.route('')
    .get(admincontroller.index);

router.route('/:item')
    .get(admincontroller.loadItem);




// bao ve route
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;