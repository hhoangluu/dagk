var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');

//modelCategory.connect();

function xoadau(str)  {
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
    str =  str.replace(/ /g, "-");
    // Gộp nhiều dấu space thành 1 space
    str = str.replace(/\s+/g, ' ');
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu   
    str.trim();
    
    
    return str;
}


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
                res.render('vwAccount/writer/writer-addpost', {dataPost: data});
            });
        }
        else if( item == 'writer-listpost-approved')
        {
            modelArticle.articleStatusByUser(function(data){
             //   console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-approved', {dataPost: data});
            }, 'approved', req.user.username);
        }
        else if( item == 'writer-listpost-waiting')
        {
            modelArticle.articleStatusByUser(function(data){
               // console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-waiting', {dataPost: data});
            }, 'waiting', req.user.username);
        }
        else if( item == 'writer-listpost-refuse')
        {
            modelArticle.articleStatusByUser(function(data){
               // console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-refuse', {dataPost: data});
            }, 'refuse', req.user.username);
        }
        else
        {
            res.render('vwAccount/admin/error');
        }
    },
    addpost: (req, res, next)=>{
        var entity = {
            item: "",
            title: req.body.postTitle,
            code: xoadau(req.body.postTitle),
            imgSource: "",
            describe: req.body.postDes,
            author: req.user.username,
            categoryBase: req.body.categoryBase,
            category: req.body.category,
            view: "1",
            selective: false,
            highlight: false,
            date: Date.now(),
            datePublish: Date.now(),
            status: "waiting",
            content: req.body.content,
            comment: "",
            commentpublic: "",
        }
        console.log("day la entity trc khi post ", entity);
        modelArticle.addArticle(function(data){
          //  console.log("Succesful");
            res.redirect('/writer');
        },entity)

    },

    removePost: (req, res, next) => {
        modelArticle.removeArticleById(function(data){

        }, req.body.id)
    },

    updatePost: (req, res, next) => {
        modelArticle.updateArticleById(function(data){

        }, req.body.article)
    }
    
}
