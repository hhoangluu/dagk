var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var userChema = new mongoose.Schema({
    username: String,
    password: String,
//    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    bookname: String, 
    phone: Intl,
    dateBorn: String,
    email: String,
    permission: String,
    category: String,
    avatar: String,
    datePrenium: Date,
});
var userModel = mongoose.model('users', userChema);

module.exports = {
    loadAll: function(res)  {
        userModel.find({}, function (err, data) {
            
            if (err) return res(null,err);
            //console.log(data);
            res(data, null);
            // console.log(categories);
        });       
    },
    add: function(res, entity )  {
         userModel.create(entity, function (err) {
            if (err) return err;
            res(0);
        })
        
    },
    change: function(res, entity )  {
        userModel.create(entity, function (err) {
           if (err) return err;
           res(0);
       })
       
   },
   
    singleByUserName: function(done, username) {
        userModel.findOne({"username": username}).exec( function(err, user) {
            console.log('model', user);
            if (err) return done(err);
            done(null, user);
        })
    },

    deleteUserbyId: function (res, id) {
        console.log("id chuẩn bị xóa: " + id);
        userModel.deleteOne({ _id: id }, function (err) {
            if (err) throw err;
            console.log("Đã xóa thằng ", id);
            res(0);
        });
    },

    InfoByUserName: function (res, id) {
        console.log("id khi tim ", id);
        userModel.findOne({_id: id}, function(err, doc){
            if (err) throw err;
             console.log(doc);
            res(doc);
        })

    },

    updateProfile:function(res, entity, uname){
        console.log("uname: " + uname);
        console.log("entity: " + entity);
        console.log("name:" + entity.name + "bookname:" + entity.bookname + "email: " + entity.email + "phone: " + entity.phone + "permission: " + entity.permission + "category: " + entity.category);
        // var user = collection('users');
        // user.updateOne({username: uname}, {$set:{name: entity.name, bookname: entity.bookname, email: entity.email, phone: entity.phone,permission: entity.permission, category: entity.category, dateBorn: entity.dateBorn, password: entity.password}}
        // );chua dang nhap dn roi
        userModel.findOne({_id: uname}, function(err, doc){
            //  doc.username = entity.username,
            doc.password= entity.password,
            doc.name= entity.name,
            doc.bookname= entity.bookname, 
            doc.phone= entity.phone,
            doc.dateBorn=entity.dateBorn,
            doc.email= entity.email,
            doc.permission= entity.permission,
            doc.category= entity.category,
            // doc.avatar= entity.avatar, 
            console.log(doc);
            doc.save();
            res(0);
        })

        
    },
}