var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var categoriesChema = new mongoose.Schema({
    category: String,
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
    }
};

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