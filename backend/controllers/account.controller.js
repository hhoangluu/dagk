var modelUser = require('../models/user.model');
var bcrypt = require('bcrypt');
var passport = require('passport');

module.exports = {
    register: (req, res, next) => {
        var saltRounds = 10;
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        console.log('hash', hash);
        var entity = {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            email: req.body.email,
            permisson: 0
        }
        console.log(entity);
        modelUser.add(function (data) {
           
            res.redirect('/account/login');
        }, entity);
    },
    login: (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                 return next(err); 
                }
            if (!user) {
                console.log("Khong thanh cong");
                return res.render('vwAccount/login', {
                   // layout: false,
                    err_message: info.message
                  })
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err); 
                }
                return res.redirect('/home');
            });
          })(req, res, next);
    },
    
    isAvailable: (req, res, next) => {
        var user = req.query.username;
        modelUser.singleByUserName(function(err ,data){
            console.log(data);
            if (data != null) {
                return res.json(false);
            }
            return res.json(true);
        }, user)
    }
}