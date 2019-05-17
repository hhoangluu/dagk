var express= require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.end('hello mother fucker')
   // res.render('vwCategory/index');
})
router.get('/1', (req, res) => {
    res.end('hello motfghfghher fucker FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
   // res.render('vwCategory/index');
})

module.exports = router;