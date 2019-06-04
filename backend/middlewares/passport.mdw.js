var passport = require('passport');
var LoccalStrategy = require('passport-local').Strategy;
var modelUser = require('../models/user.model')
var bcrpyt = require('bcrypt');

var isValidPassword = function(user, password){
    return bcrpyt.compareSync(password, user.password);
  }

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LoccalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        modelUser.singleByUserName(function(err, user) {
           
            if (err) {
                console.log(err);
                return done(err,false);
            }
            if (!user) {
                console.log('Invalid Username');
                return done(null, false, {message: 'Invailid username.'});
            }
            if (!isValidPassword(user, password)){
                console.log('Invalid Password');
                return done(null, false, {message: 'Wrong password.'})
            }
            return done(null, user);
        }, username)
    });

    passport.use(ls);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}