var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
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
            res.render('vwAccount/subcriber/subcriber-info',
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
        else if( item == 'subcriber-vip')
        {
            res.render('vwAccount/subcriber/subcriber-vip');
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },
    
    
}