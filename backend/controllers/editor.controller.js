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
            res.render('vwAccount/editor/editor-info');
        }
        else if( item == 'editor-listpost')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/editor/editor-listpost', {dataPost: data});
            }, 'waiting')
        }
        else if( item == 'editor-listpost-error')
        {
            modelArticle.articleStatus(function(data){
                res.render('vwAccount/editor/editor-listpost-error', {dataPost: data});
            }, 'refuse')
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },
    
    
}