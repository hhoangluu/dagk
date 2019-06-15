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
            // console.log('account data la:');
            // console.log("username: " + req.user.username);
            // console.log("pass: " + req.user.password);
            // console.log("email: " + req.user.email);
            // console.log("_id: " + req.user._id);
            res.render('vwAccount/admin/admin-info',
                {
                    id: req.user._id,
                    username: req.user.username,
                    bookname: req.user.bookname,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    permisson: req.user.permisson,
                    dateBorn: req.user.dateBorn,
                    avatar: req.user.avatar,
                });

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
            permisson: 0
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
    
}
