var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');

//modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
        res.render('vwAccount/admin/admin');
    },

    loadItem: (req, res, next) => {
        var item = req.params.item;
        if( item == 'admin-addaccount')
        {
            res.render('vwAccount/admin/Admin-Addaccount');
        }
        else if( item == 'admin-info')
        {
            res.render('vwAccount/admin/admin-info');
        }
        else if( item == 'admin-listpost')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/admin/Admin-ListPost', {dataPost: data});
            }, 'waiting')
        }
        else if( item == 'admin-listpost-error')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/admin/Admin-ListPost-Error', {dataPost: data});
            }, 'refuse')
        }
        else if( item == 'admin-listuser')
        {
            modelUser.loadAll(function(data){
                res.render('vwAccount/admin/Admin-ListUser', { dataUser: data });
            })
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
        
    },
    
    
}