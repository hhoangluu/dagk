var modelUser = require('../models/user.model');
var bcrypt = require('bcrypt');

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

    }
}