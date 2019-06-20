var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var categoriesChema = new mongoose.Schema({
    category: String,
    code: String,
    child: [
        {
           name: String,
           code: String,
           view: Intl, 
        }
    ]
});
var categoriesModel = mongoose.model('categories', categoriesChema);

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
    loadAll: function(res)  {
         
        categoriesModel.find({}, function (err, data) {
            
            if (err) return res(null,err);
            //console.log(data);
            res(data, null);
            // console.log(categories);
        });       
    },
    mostView: function (res) {

        categoriesModel.aggregate([
            {
                "$unwind": "$child"
            }, {
                "$sort": {
                    "child.view": -1
                }
            }, {
                $limit: 10
            }], function (err, data) {
                //console.log(data);
                res(data);
            })

    },
    catChildNav: function (res, child) {
        //console.log(child);
        categoriesModel.aggregate([{
            "$unwind": "$child"
        }, {
            $match: {
                "child.code": child
            }
        }], function (err, data) {
            //console.log(data);

            if (err) throw err;
            res(data[0]);
        })

    },
    catNav: function(res, cat){
        categoriesModel.aggregate([{
            $match: {
                "code": cat
            }
        }], function( err, data) {
            if (err) return  console.log( err);
            res(data[0]);
            //console.log(data);
        })
    },

    // Quản lý danh mục

    addCat: function(res, Namecat){
       
        var entity = {
            category: Namecat,
            code: xoadau(Namecat),
            view: 0,
            child: [],             
            
        };
        
        categoriesModel.create(entity,function(err){      
                  
            if (err) return err;
            res(0);
        })
    },



    addChildWithCodeBase: function(res, catCode, childName){
        categoriesModel.find({
            code: catCode
        }, function(err, doc){
            if (err) throw err;
            var entity = {
                name: childName,
                code: xoadau(childName),
                view: 0,
            };

            doc.update({$push: {child: entity}});
            console.log("childName = : " + entity.name);
            console.log("code = : " + entity.code);
            console.log("doc = : " + doc);

            res(0);
            doc.save();
        })
    },

    updateCatWithCode: function (res, catCode, nameNewCat) {
        categoriesModel.find({
            code: catCode
        }, function (err, doc) {
            if (err) throw err;

            doc.name = nameNewCat;
            doc.code = xoadau(nameNewCat);
            doc.save();
            res(0);
        })
    },

    updateChildWithCode: function(res, childCode, nameNewChild){
        categoriesModel.aggregate([{
            "$unwind": "$child"
        }, {
            $match: {
                "child.code": childCode
            }
        }], function (err, data) {
            //console.log(data);
            data[0].name = nameNewChild;
            data[0].code = xoadau(nameNewChild);
            data[0].save();
            if (err) throw err;
            res(data[0]);
        })
    },

    removeCatWithCode: function(res, catCode){
        categoriesModel.deleteOne({
            code: catCode
        },function(err){
            if (err) throw err;                   
            res(0);
        })
    },

    removeChildWithCode: function(res, childCode){
        categoriesModel.aggregate([{
            "$unwind": "$child"
        }, {
            $match: {
                "child.code": childCode
            }
        }], function (err, data) {  
            data = null;
            data.save();
            //console.log(data);
            if (err) throw err;
            res(data[0]);
        }) 
    }


};
// , {
//     "$group": {
//         "child": {
//             "$push": "$child"
//         },
//         "_id": 1
//     }
// }, {
//     "$project": {
//         "_id": 0,
//         "child": 1
//     }
// }
// exports.update = exports.create = function (key, title, body) {
//     notes[key] = { title: title, body: body };
// }

// exports.read = function (key) {
//     return notes[key];
// }

// exports.destroy = function (key) {
//     delete notes[key];
// }

// exports.keys = function () {
//     return Object.keys(notes);
// }