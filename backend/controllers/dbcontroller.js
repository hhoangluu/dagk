var mongoose = require('mongoose');

// Conect database



var categoriesChema = new mongoose.Schema({
    category: String,
    child: [ 
        {
            category: String
        }
    ]
});
var categories = mongoose.model('categories', categoriesChema)

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
    load: () => {
        
        categories.find({}, function (err, data) {
            console.log(data);
            if (err) throw err;
            categories = data;
        });
        return categories;
    }
};