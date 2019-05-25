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
            
            if (err) throw err;
            //console.log(data);
            res(data);
            // console.log(categories);
        });       
    },
    mostView: function (res) {

        categoriesModel.aggregate([{
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
    catChildNav: function(res, child) {
        //console.log(child);
        categoriesModel.aggregate([{      
            "$unwind": "$child" 
        },{
            $match: {
            "child.code" : child 
            }
        }], function (err, data) {
            console.log(data);
            res(data[0]);
        })

    },
    catNav: function(res, cat){
        categoriesModel.aggregate([{
            $match: {
                "code": cat
            }
        }], function( err, data) {
            if (err) throw err;
            res(data[0]);
            console.log(data);
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