var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');

//modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
        res.render('vwAccount/writer/writer');
    },

    loadItem: (req, res, next) => {
        var item = req.params.item;
        if( item == 'writer-info')
        {
            res.render('vwAccount/writer/writer-info',
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
        else if( item == 'writer-addpost')
        {
            modelCategory.loadAll(function(data){
                console.log('category: ' + data);
                res.render('vwAccount/writer/writer-addpost', {dataCategory: data});
            });
        }
        else if( item == 'writer-listpost-approved')
        {
            modelArticle.articleStatus(function(data){
                console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-approved', {dataCategory: data});
            }, 'approved');
        }
        else if( item == 'writer-listpost-waiting')
        {
            modelArticle.loadAll(function(data){
                console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-waiting', {dataCategory: data});
            }), 'waiting';
        }
        else if( item == 'writer-listpost-refuse')
        {
            modelArticle.articleStatus(function(data){
                console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-refuse', {dataCategory: data});
            }, 'refuse');
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },
    
    
}