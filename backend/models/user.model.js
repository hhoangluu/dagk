var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var userChema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    permisson: Intl
});
var userModel = mongoose.model('users', userChema);

module.exports = {
    add: function(res, entity )  {
         userModel.create(entity, function (err) {
            if (err) return err;
            res(0);
        })
        
    },
    singleByUserName: function(done, username) {
        userModel.findOne({"username": username}).exec( function(err, user) {
            console.log('model', user);
            if (err) return done(err);
            done(null, user);
        })
    }
}