var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const homepagecontroller = require('../controllers/homepagecontroller');

var categoryModel = require('../models/categories.model');


// router.route('/register')
// .get(homepagecontroller.index)
// .post(homepagecontroller.register);

router.route('')
    .get(homepagecontroller.index)
    .post(homepagecontroller.register);
    router.route('/tag')
    .get(homepagecontroller.articleByTag);

router.route('/:category')
    .get(homepagecontroller.categories)
  //  .post(homepagecontroller.register);

router.route('/:category/:childCategory')
    .get(homepagecontroller.childCategories)
  //  .post(homepagecontroller.register);
    
router.route('/:category/:childCategory/:post')
    .get(homepagecontroller.loadPost)
   // .post(homepagecontroller.register);

// router.get('/:category', (req, res, next) => {
//     var category = req.param.category;
//     var p = categoryModel.loadAll(category);
//     p.then(rows => {
//         console.log('clgt ?');
//         router.get(homepagecontroller.categories)
//     }).catch(next);
// })


// router.get('/', (err ,req, res, next) => {

//     router.route('/:category')
//     .get(homepagecontroller.categories);

//     // if (err)
//     // {
//     //     console.log('err :' + err);
//     //     return next(err);
//     // }
// })

// router.get('/:category', (err ,req, res, next) => {

//     router.get(homepagecontroller.categories);
//     // if (err)
//     // {
//     //     console.log('err :' + err);
//     //     return next(err);
//     // }
// })

// router.get('/:category/:childCategory', (err ,req, res, next) => {

//     router.get(homepagecontroller.childCategories);
//     // if (err)
//     // {
//     //     console.log('err :' + err);
//     //     return next(err);
//     // }

// })


module.exports = router;