var mongoose = require('mongoose');

// Conect database

mongoose.connect("mongodb+srv://admin:123@th16news-v3igk.mongodb.net/th16news?retryWrites=true",
    {
        useNewUrlParser: true,
    }, function (err) {
        if (err) throw err;
        console.log('Connect to database Sucessful!');
    });

//create a chema this is like blueprint
// var thnewsChema = new mongoose.Schema({
//     item: String,
// });

// var th16news = mongoose.model('Bongda', thnewsChema);

// var itemFirst = th16news({ item: "bai so 1" }).save(function (err) {
//     if (err) throw err;

// })

module.exports = mongoose;