var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var articleChema = new mongoose.Schema({
    item: String,
    title: String,
    code: String,
    imgSource: String,
    describe: String,
    author: String,
    categoryBase: String,
    category: String,
    view: Intl,
    selective: Boolean,
    highlight: Boolean,
    date: Date,
    datePublish: Date,
    status: String,
    content: String,
    comment: String,
    commentpublic: String,
});
var articleModel = mongoose.model('bongdas', articleChema);




module.exports = {
    connect: () => {
        mongoose.connect("mongodb+srv://admin:123@th16news-v3igk.mongodb.net/th16news?retryWrites=true",
            {
                useNewUrlParser: true,
            }, function (err) {
                if (err) throw err;
                console.log('Connect to database Sucessful!');
            });
    },
    loadAll: function (res) {

        articleModel.find({}, function (err, data) {

            if (err) throw err;
            //console.log(data);
            res(data);
            // console.log(article);
        });
    },
    latest: function (res) {
        articleModel.find({}).sort({ date: -1 }).limit(10).exec(function (err, data) {
            if (err) throw err;
            // console.log(data);
            res(data);
        })


    },
    mostView: function (res) {

        articleModel.find({}).sort({ view: -1 }).limit(10).exec(function (err, data) {
            if (err) throw err;
            // console.log(data);
            res(data);
        })

    },

    articleByCat: function (res, cat) {
        articleModel.aggregate([{
            $match: {
                "categoryBase": cat
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            //console.log(data);
        })

    },
    articleByChild: function (res, child) {
        articleModel.aggregate([{
            $match: {
                "category": child
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            //console.log(data);
        })

    },
    articleByChildLimit: function (res, child, limit, offset) {
        articleModel.find(
            { "category": child } 
            ).skip(offset).limit(limit).exec(function (err, data) {
                //console.log(data);
                if (err) throw err;
                res(data);
            })

    },

    articleCountByChild: function (res, child) {
        articleModel.find(
            { 
                "category": child
            }
        ).count().exec(function (err, data) {
            //console.log(data);
            if (err) throw err;
            res(data);
        });
    },

    articlePost: function (res, codePost) {
        articleModel.aggregate([{
            $match: {
                "code": codePost
            }
        }], function (err, data) {
            if (err) throw err;
            res(data[0]);
            //console.log(data);
        })

    },

    
    articleStatus: function (res, status) {
        articleModel.aggregate([{
            $match: {
                "status": status
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            console.log(data);
        })
    },

    articleByAuthor: function (res) {
        articleModel.aggregate([{
            $match: {
                //"author": author
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            console.log(data);
        })
    },

    addArticle: function(res, article){
        articleModel.create(article,function(err){
            if (err) return err;
            res(0);
        })
     
    }
   

};
