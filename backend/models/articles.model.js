var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var articleChema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    tag: String,
    prenium: Boolean
});
articleChema.index( { title: "text", describe: "text", content: "text" } );
var articleModel = mongoose.model('bongdas', articleChema);
function xoadau(str)  {
    //console.log("dang xoa dau cai nay",str);
    if(!str) return; 
    str.trim();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/ /g, "-");
    // Gộp nhiều dấu space thành 1 space
    str = str.replace(/\s+/g, ' ');
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu   
  
    
    
    return str;
}



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
        articleModel.find({
                status: "approved",
                 datePublish:{
                    $lt: new Date()
                 }   
        }).sort({ date: -1 }).limit(10).exec(function (err, data) {
            if (err) throw err;
            // console.log(data);
            res(data);
        })


    },
    mostView: function (res) {

        articleModel.find({
            status: "approved",
            datePublish:{
               $lt: new Date()
            }   
        }).sort({ view: -1 }).limit(10).exec(function (err, data) {
            if (err) throw err;
            // console.log(data);
            res(data);
        })

    },
    loadAllPublic: function(res){
        var a = new Date();

        articleModel.aggregate([{
            $match: {
                "status": "approved",
                 "datePublish":{
                    $lt: a
                 }         
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            //console.log(data);
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
    articleByCatPublish: function (res, cat) {
        articleModel.aggregate([{
            $match: {
                "categoryBase": cat,
                "status": "approved",
                "datePublish":{
                    $lt: new Date()
                 }  
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
    articleByChildPublish: function (res, child) {
        articleModel.aggregate([{
            $match: {
                "category": child,
                "status": "approved",
                "datePublish":{
                    $lt: new Date()
                 } 
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            //console.log(data);
        })

    },
    articleByChildLimit: function (res, child, limit, offset) {
        articleModel.find(
            { "category": child,
            "status": "approved",
            "datePublish":{
                $lt: new Date()
            } 
        }).skip(offset).limit(limit).exec(function (err, data) {
                //console.log(data);
                if (err) throw err;
                res(data);
            })

    },

    articleCountByChild: function (res, child) {
        articleModel.find(
            { 
                "category": child,
                "status": "approved",
            "datePublish":{
                $lt: new Date()
            }
        }).count().exec(function (err, data) {
            //console.log(data);
            if (err) throw err;
            res(data);
        });
    },
    articleByCatLimit: function (res, cat, limit, offset) {
        articleModel.find(
            { "categoryBase": cat,
            "status": "approved",
            "datePublish":{
                $lt: new Date()
            } 
        }).skip(offset).limit(limit).exec(function (err, data) {
                console.log(data);
                if (err) throw err;
                res(data);
            })

    },

    articleCountByCat: function (res, cat) {
        articleModel.find(
            { 
                "categoryBase": cat,
                "status": "approved",
            "datePublish":{
                $lt: new Date()
            }
        }).count().exec(function (err, data) {
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
                "status": status,
                               
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
            console.log(data);
        })
    },
    articleStatusByUser: function (res, status, username) {
        articleModel.aggregate([{
            $match: {
                "status": status,
                "auther": username                 
            }
        }], function (err, data) {
            if (err) throw err;
            res(data);
        //    console.log(data);
        })
    },
    articleStatusByCat: function(res, status, category){
        articleModel.aggregate([{
            $match: {
                "status": status,
                "categoryBase": category                 
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
           // console.log(data);
        })
    },
    articleByTag: function(res, tag){
        articleModel.find({
            tag: tag
        },function(err, data){
            if (err) throw err;
            console.log(data);
            res(data);
        })
    },

    addArticle: function(res, article){
        articleModel.create(article,function(err){
            
            if (err) return err;
            res(0);
        })
     
    },

    removeArticleById: function(res, id){
        articleModel.deleteOne({ _id: id }, function (err) {
        if(err) throw err;
            console.log("Đã xóa thằng ", id);
            res(0);
        });
    },

    updateArticleById: function(res, article){
        articleModel.findOne({ _id: article.id }, function (err, doc){
            doc=article;
            doc.save();
            res(0);
          });
    },

    updateArticleStatusById: function(res, status, id, datePublish) {
        articleModel.findOne({ _id: id }, function (err, doc){
            var temp = new Date();
            doc.datePublish = datePublish || temp;
            doc.status = status;
            console.log(doc);
            doc.save();
            res(0);
          });
    },
    singleById: function (res, id) {
        articleModel.findOne({ _id: id }).exec(function (err, data) {
            res(data);
        });
    },

    articleSearchPrenium: function (res, text) {
        console.log(text);
       
        articleModel.find(
            { $text: { $search: text }},
         
         ).sort({prenium: -1}).find({
            "status": "approved",
            "datePublish":{
                $lt: new Date()
            }

         }).exec( function (err, doc) {
                if (err) throw err;
                console.log(doc);
                res(doc);
            });
    },

    articleSearch: function (res, text) {
        console.log(text);
       
        articleModel.find(
            { $text: { $search: text }},
         
         ).find({
            "status": "approved",
            "datePublish":{
                $lt: new Date()
            }

         }).exec( function (err, doc) {
                if (err) throw err;
                console.log(doc);
                res(doc);
            });
    },


}
