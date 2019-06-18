var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var bcrypt = require('bcrypt');
var modelUser = require('../models/user.model');

//modelCategory.connect();

function xoadau(str)  {
    //console.log("dang xoa dau cai nay",str);
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
    index: (req, res, next) => {
        res.render('vwAccount/writer/writer');
    },

    loadItem: (req, res, next) => {
        var item = req.params.item;
        if (item == 'writer-info') {
            modelUser.InfoByUserName(function (data) {
                console.log("username: " + data.username);
                res.render('vwAccount/writer/writer-info', { dataUser: data });
            }, req.user._id);
        }
        else if (item == 'writer-addpost') {
            modelCategory.loadAll(function (data) {
                console.log('category: ' + data);
                res.render('vwAccount/writer/writer-addpost', { dataPost: data });
            });
        }
        else if (item == 'writer-listpost-approved') {
            modelArticle.articleStatusByUser(function (data) {
                //   console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-approved', { dataPost: data });
            }, 'approved', req.user.username);
        }
        else if (item == 'writer-listpost-waiting') {
            modelArticle.articleStatusByUser(function (data) {
                // console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-waiting', { dataPost: data });
            }, 'waiting', req.user.username);
        }
        else if (item == 'writer-listpost-refuse') {
            modelArticle.articleStatusByUser(function (data) {
                // console.log('category: ' + data);
                res.render('vwAccount/writer/writer-listpost-refuse', { dataPost: data });
            }, 'refuse', req.user.username);
        }
        else {
            res.render('vwAccount/admin/error');
        }
    },
    addpost: (req, res, next) => {
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
            imgSource: req.body.fuMain
        }
        console.log("day la entity trc khi post ", entity);
        modelArticle.addArticle(function (data) {
            //  console.log("Succesful");
            res.redirect('/writer');
        }, entity)

    },

    removePost: (req, res, next) => {
        modelArticle.removeArticleById(function (data) {

        }, req.body.id)
    },

    updatePost: (req, res, next) => {
        modelArticle.updateArticleById(function (data) {

        }, req.body.article)
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
                res.redirect('/writer/writer-info');
            }, entity, req.user._id);
        }, req.user._id);
    },

}
