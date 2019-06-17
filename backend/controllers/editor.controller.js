var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');

//modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
        res.render('vwAccount/editor/editor');
    },

    loadItem: (req, res, next) => {
        var item = req.params.item;
        if( item == 'editor-info')
        {
            res.render('vwAccount/editor/editor-info',
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
        else if( item == 'editor-listpost-approved')
        {
            modelArticle.articleStatusByCat(function(data){
                res.render('vwAccount/editor/editor-listpost-approved', {dataPost: data});
            }, 'approved', req.user.editor)
        }
        else if( item == 'editor-listpost-waiting')
        {
            modelArticle.articleStatusByCat(function(data){
                res.render('vwAccount/editor/editor-listpost-waiting', {dataPost: data});
            }, 'waiting',req.user.editor)
        }
        else if( item == 'editor-listpost-refuse')
        {
            modelArticle.articleStatusByCat(function(data){
                res.render('vwAccount/editor/editor-listpost-refuse', {dataPost: data});
            }, 'refuse',req.user.editor)
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },

    refuseArticle: (req, res, next) => {
        modelArticle.updateArticleStatusById(function(data){
            res.redirect('/editor/editor-listpost-waiting');
        }, 'refuse', req.body.id)
    },

    acceptArticle: (req, res, next) => {
        modelArticle.updateArticleStatusById(function(data){
            res.redirect('/editor/editor-listpost-waiting');
        }, 'approved', req.body.id)
    },
    
    
}