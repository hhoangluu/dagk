var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var bcrypt = require('bcrypt');
var modelUser = require('../models/user.model');

//modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
        res.render('vwAccount/subcriber/subcriber');
    },

    loadItem: (req, res, next) => {
        var item = req.params.item;
        if( item == 'subcriber-info')
        {
            modelUser.InfoByUserName(function (data) {
                console.log("username: " + data.username);
                res.render('vwAccount/subcriber/subcriber-info', { dataUser: data });
            }, req.user._id);
        }
        else if( item == 'subcriber-vip')
        {
            res.render('vwAccount/subcriber/subcriber-vip');
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },

    updateProfile: (req, res, next) => {
        console.log("chay cai nay");
        modelUser.InfoByUserName(function (data) {
            var password;
            var name;
            var bookname;
            var email;
            var phone;
            var permission;
            var category;
            var dateBorn;
            if (req.body.password == undefined) {
                console.log("pass truoc:" + password);
                password = data.password;
                console.log("pass sau:" + password);
            }
            else {
                console.log("pass truoc khi hash:" + req.body.password);
                password = bcrypt.hashSync(req.body.password, 10);
                console.log("pass sau khi hash:" + password);
            }
            if (req.body.name == undefined) {
                name = data.name;
                console.log("name ", data.name);
            }
            else {
                name = req.body.name;
            }

            if (req.body.bookname == undefined) {
                bookname = data.bookname;
                console.log("bookname ", data.bookname);
            }
            else {
                bookname = req.body.bookname;
            }

            if (req.body.email == undefined) {
                email = data.email;
            }
            else {
                email = req.body.email;
            }

            if (req.body.phone == undefined) {
                phone = data.phone;
            }
            else {
                phone = req.body.phone;
            }

            if (req.body.permission == undefined) {
                permission = data.permission;
            }
            else {
                permission = req.body.permission;
            }

            if (req.body.category == undefined) {
                category = data.category;
            }
            else {
                category = req.body.category;
            }

            if (req.body.dateBorn == undefined) {
                dateBorn = data.dateBorn;
            }
            else {
                dateBorn = req.body.dateBorn;
            }
            var entity = {
                //_id: req.user._id,
                //username: req.user.username,
                name: name,
                bookname: bookname,
                email: email,
                phone: phone,
                permission: permission,
                category: category,
                dateBorn: dateBorn,
                password: password,
            }
            console.log("day la entity trc khi update ", entity);
            modelUser.updateProfile(function (data) {
                //  console.log("Succesful");
                res.redirect('/subcriber/subcriber-info');
            }, entity, req.user._id);
        }, req.user._id);
    },
    
    
}