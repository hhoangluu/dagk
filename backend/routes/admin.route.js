var express = require('express');
var router = express.Router();

const admincontroller = require('../controllers/admin.controller');


router.route('/addCategoryBase')
    .post(admincontroller.addCategory);
router.route('/addCategoryChild')
    .post(admincontroller.addChildWithCodeBase);
router.route('/deleteCategoryBase')
    .post(admincontroller.deleteCategory);
router.route('/deleteCategoryChild')
    .post(admincontroller.deleteChildWithCodeBase);
router.route('/editCategoryBase')
    .post(admincontroller.updateCategory);
router.route('/editCategoryChild')
    .post(admincontroller.updateChildWithCodeBase);



router.route('/admin-listuser')
    .post(admincontroller.updateProfileListUser);
router.route('/refuse')
    .post(admincontroller.refuseArticle);
router.route('/accept')
    .post(admincontroller.acceptArticle);

router.route('/deleteUser')
    .post(admincontroller.deleteUser);

router.route('/remove')
    .post(admincontroller.deleteArticle);


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