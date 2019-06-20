var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');
var bcrypt = require('bcrypt');
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
    index: (req, res, next) => {
        if(typeof req.user === 'undefined'){
            res.redirect('/account/login');
        }
        else{
            var per = req.user.permission;
            if (per != 'admin') {
                res.redirect('/' + per);
            }
            else {
                res.render('vwAccount/admin/admin');
            }            
        }
    },

    loadItem: (req, res, next) => {
        if(typeof req.user === 'undefined'){
            res.redirect('/account/login');
        }
        else{
            var per = req.user.permission;
            if (per != 'admin') {
                res.redirect('/' + per);
            }
            else {
                var item = req.params.item;
                if (item == 'admin-addaccount') {
                    res.render('vwAccount/admin/admin-addaccount');
                }
                else if (item == 'admin-info') {
                    modelUser.InfoByUserName(function (data) {
                        console.log("username: " + data.username);
                        res.render('vwAccount/admin/admin-info', { dataUser: data });
                    }, req.user._id);
    
                }
                else if (item == 'admin-listpost-approved') {
                    modelArticle.articleStatus(function (data) {
                        res.render('vwAccount/admin/admin-listpost-approved', { dataPost: data });
                    }, 'approved')
                }
                else if (item == 'admin-listpost-waiting') {
                    modelArticle.articleStatus(function (data) {
                        res.render('vwAccount/admin/admin-listpost-waiting', { dataPost: data });
                    }, 'waiting')
                }
                else if (item == 'admin-listpost-refuse') {
                    modelArticle.articleStatus(function (data) {
                        res.render('vwAccount/admin/admin-listpost-refuse', { dataPost: data });
                    }, 'refuse')
                }
                else if (item == 'admin-listuser') {
                    modelUser.loadAll(function (data) {
                        res.render('vwAccount/admin/admin-listuser', { dataUser: data });
                    })
                }
                else if(item == 'admin-category'){
                    modelCategory.loadAll(function (data) {
                        console.log('category: ' + data);
                        res.render('vwAccount/admin/admin-category', { dataPost: data });
                    });
                }
                else {
                    res.render('vwAccount/admin/error');
                }
            }
        }
    },

    register: (req, res, next) => {
        console.log('admin chay cai nay');
        var saltRounds = 10;
        console.log('admin req:   ', req);
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        console.log('admin hash:   ', hash);
        var entity = {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            email: req.body.email,
            permisson: "subcriber",
        }
        console.log('admin het chay 1');
        console.log('admin entity:   ' + entity);

        modelUser.add(function (data) {
            console.log('them nhan vien thanh cong');
            res.redirect('/admin');
        }, entity);
        console.log('admin het chay');
    },

    isAvailable: (req, res, next) => {
        var user = req.query.username;
        console.log(user);
        modelUser.singleByUserName(function (err, data) {
            console.log('account data la:');
            //console.log(data);
            if (data != null) {
                return res.json(false);
            }
            return res.json(true);
        }, user)
    },

    changeInfoUser: (req, res, next) => {
        console.log('admin chay cai nay');
        var saltRounds = 10;
        console.log('admin req:   ', req);
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        console.log('admin hash:   ', hash);
        var entity = {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            email: req.body.email,
            permisson: 0
        }
        console.log('admin het chay 1');
        console.log('admin entity:   ' + entity);

        modelUser.change(function (data) {
            console.log('thay doi thanh cong');
            res.redirect('/admin');
        }, entity);
        console.log('admin het chay');
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
            var datePrenium;
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
            if (req.body.datePrenium == undefined) {
                datePrenium = data.datePrenium;
            }
            else {
                datePrenium = req.body.datePrenium;
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
                datePrenium: datePrenium,
            }
            console.log("day la entity trc khi update ", entity);
            modelUser.updateProfile(function (data) {
                //  console.log("Succesful");
                res.redirect('/admin/admin-info');
            }, entity, req.user._id);
        }, req.user._id);
    },

    updateProfileListUser: (req, res, next) => {
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
            var datePrenium;
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
            if (req.body.datePrenium == undefined) {
                datePrenium = data.datePrenium;
            }
            else {
                datePrenium = req.body.datePrenium;
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
                datePrenium: datePrenium,
            }
            console.log("day la entity trc khi update ", entity);
            modelUser.updateProfile(function (data) {
                //  console.log("Succesful");
                res.redirect('/admin/admin-listuser');
            }, entity, req.body.id);
        }, req.body.id);
    },

    refuseArticle: (req, res, next) => {
        modelArticle.updateArticleStatusById(function(data){
            res.redirect('/admin/admin-listpost-refuse');
        }, 'refuse', req.body.id, new Date())
    },

    deleteUser: (req, res, next) => {
        console.log("aaaaaaaaaa id = " + req.body.id111);
        modelUser.deleteUserbyId(function(data){
            res.redirect('/admin/admin-listuser');
        },req.body.id111);
    },

    acceptArticle: (req, res, next) => {
        var dayPublish;
        if (req.body.bday){
            dayPublish = req.body.bday;
        }
        else {
            datePublish = new Date();
        }
        modelArticle.updateArticleStatusById(function(data){
            res.redirect('/admin/admin-listpost-approved');
        }, 'approved', req.body._id, dayPublish)
    },
    deleteArticle: (req,res, next) => {
        console.log("xóa thằng ", req.body.id)
        modelArticle.removeArticleById( function (data) {      
                  
            res.redirect('/admin/admin-listpost-refuse');
        }, req.body.id);
    },

    /// Quản lý danh mục

    addCategory: (req, res, next)=> { // thêm danh mục
        var newCat =req.body.category; // string
           
        modelCategory.addCat(function(data){
            res.redirect('/admin/admin-category');
        }, newCat);
    },
    addChildWithCodeBase: (req,res,next)=>{
        var catCode = xoadau(req.body.category)  // tên danh mục mạ
        var newChild = req.body.categoryChild // tên danh mục con
       
        modelCategory.addChildWithCodeBase(function(data){
            res.redirect('/admin/admin-category');
        }, catCode, newChild)
    },

    updateCategory: (req, res, next)=>{
        var nameNewCat = req.body.name;
        var catCode = xoadau(nameNewCat);
        modelCategory.updateCatWithCode(function(data){
            res.redirect('/admin/admin-category');
        },catCode, nameNewCat)
    },

    updateChildWithCodeBase: (req,res,next)=>{
        var childCode = req.body.childCode  // tên danh mục mạ
        var nameNewChild = req.body.name // tên danh mục con

        modelCategory.updateChildWithCode(function(data){
            res.redirect('/admin/admin-category');
        },childCode, nameNewChild)
    },


    deleteCategory: (req, res, next)=>{
        var catCode = req.body.catcode;  // tên danh mục mạ
        modelCategory.removeCatWithCode(function(data){
            res.redirect('/admin/admin-category');
        },catCode)
    },

    deleteChildWithCodeBase: (req,res,next)=>{
        var childCode = req.body.childCode  // tên danh mục mạ
        modelCategory.removeChildWithCode(function(data){
            res.redirect('/admin/admin-category');
        },childCode)
    },

}
