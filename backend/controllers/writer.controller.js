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
            res.render('vwAccount/writer/writer-info');
        }
        else if( item == 'writer-addpost')
        {
            modelCategory.loadAll(function(data){
                console.log('category: ' + data);
                res.render('vwAccount/writer/writer-addpost', {dataCategory: data});
            });
        }
        else if( item == 'writer-history')
        {
            modelArticle.articleByAuthor(function(data){
                res.render('vwAccount/writer/writer-history', {dataPost: data});
            })
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },
    
    
}