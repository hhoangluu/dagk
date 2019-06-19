var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');
var bcrypt = require('bcrypt');

//modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
        if (typeof req.user === 'undefined') {
            res.redirect('/account/login');
        }
        else {
            var per = req.user.permission;
            if (per != 'editor') {
                res.redirect('/' + per);
            }
            else {
                res.render('vwAccount/editor/editor');
            }
        }
    },

    loadItem: (req, res, next) => {
        if (typeof req.user === 'undefined') {
            res.redirect('/account/login');
        }
        else{
            var per = req.user.permission;
            if (per != 'editor') {
                res.redirect('/' + per);
            }
            else {
                var item = req.params.item;
                if (item == 'editor-info') {
                    modelUser.InfoByUserName(function (data) {
                        console.log("username: " + data.username);
                        res.render('vwAccount/editor/editor-info', { dataUser: data });
                    }, req.user._id);
                }
                else if (item == 'editor-listpost-approved') {
                    modelArticle.articleStatusByCat(function (data) {
                        res.render('vwAccount/editor/editor-listpost-approved', { dataPost: data });
                    }, 'approved', req.user.editor)
                }
                else if (item == 'editor-listpost-waiting') {
                    modelArticle.articleStatusByCat(function (data) {
                        res.render('vwAccount/editor/editor-listpost-waiting', { dataPost: data });
                    }, 'waiting', req.user.editor)
                }
                else if (item == 'editor-listpost-refuse') {
                    modelArticle.articleStatusByCat(function (data) {
                        res.render('vwAccount/editor/editor-listpost-refuse', { dataPost: data });
                    }, 'refuse', req.user.editor)
                }
                else {
                    res.render('vwAccount/admin/error');
                }
            }
        }
    },

    refuseArticle: (req, res, next) => {
        modelArticle.updateArticleStatusById(function (data) {
            res.redirect('/editor/editor-listpost-waiting');
        }, 'refuse', req.body._id, new Date())
    },

    acceptArticle: (req, res, next) => {
        modelArticle.updateArticleStatusById(function (data) {
            res.redirect('/editor/editor-listpost-waiting');
        }, 'approved', req.body._id, req.body.bday)
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
                res.redirect('/editor/editor-info');
            }, entity, req.user._id);
        }, req.user._id);
    },
}