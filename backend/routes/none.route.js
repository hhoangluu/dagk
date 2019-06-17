var express = require('express');
var router = express.Router();

router.get('', (req, res, next) => {
    res.redirect('/home');
})

module.exports = router;