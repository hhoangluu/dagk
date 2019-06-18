var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');
var bcrypt = require('bcrypt');



module.exports = {
    index: (req, res, next) => {
        res.render('vwAccount/admin/admin');
    },

    loadItem: (req, res, next) => {
        var item = req.params.item;
        if( item == 'admin-addaccount')
        {
            res.render('vwAccount/admin/admin-addaccount');
        }
        else if (item == 'admin-info') {
            modelUser.InfoByUserName(function (data) {
                console.log("username: " + data.username);
                res.render('vwAccount/admin/admin-info', { dataUser: data });
            }, req.user._id);

        }
        else if( item == 'admin-listpost-approved')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/admin/admin-listpost-approved', {dataPost: data});
            }, 'approved')
        }
        else if( item == 'admin-listpost-waiting')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/admin/admin-listpost-waiting', {dataPost: data});
            }, 'waiting')
        }
        else if( item == 'admin-listpost-refuse')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/admin/admin-listpost-refuse', {dataPost: data});
            }, 'refuse')
        }
        else if( item == 'admin-listuser')
        {
            modelUser.loadAll(function(data){
                res.render('vwAccount/admin/admin-listuser', { dataUser: data });
            })
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
        
    },

    register: (req, res, next) => {
        console.log('admin chay cai nay');
        var saltRounds = 10;
        console.log('admin req:   ', req);
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        console.log('admin hash:   ', hash);
        var entity = {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            email: req.body.email,
            permisson: "subcriber",
        }
        console.log('admin het chay 1');
        console.log('admin entity:   ' + entity);

        modelUser.add(function (data) {
           console.log('them nhan vien thanh cong');
            res.redirect('/admin');
        }, entity);
        console.log('admin het chay');
    },
    
    isAvailable: (req, res, next) => {
        var user = req.query.username;
        console.log(user);
        modelUser.singleByUserName(function(err ,data){
            console.log('account data la:');
            //console.log(data);
            if (data != null) {
                return res.json(false);
            }
            return res.json(true);
        }, user)
    },
    
    changeInfoUser: (req, res, next) => {
        console.log('admin chay cai nay');
        var saltRounds = 10;
        console.log('admin req:   ', req);
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        console.log('admin hash:   ', hash);
        var entity = {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            email: req.body.email,
            permisson: 0
        }
        console.log('admin het chay 1');
        console.log('admin entity:   ' + entity);

        modelUser.change(function (data) {
           console.log('thay doi thanh cong');
            res.redirect('/admin');
        }, entity);
        console.log('admin het chay');
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
                res.redirect('/admin/admin-info');
            }, entity, req.user._id);
        }, req.user._id);
    },

    updateProfileListUser: (req, res, next) => {
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
                res.redirect('/admin/admin-listuser');
            }, entity, req.user._id);
        }, req.user._id);
    },
}
