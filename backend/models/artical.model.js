var mongoose = require('mongoose');
const homepagecontroller = require('../controllers/homepagecontroller')
var categoriesChema = new mongoose.Schema({
    item: String,
    title: String,
    imgSource: String,
    describe: String,
    categoryBase: String,
    category: String,
    view: Intl,
    selective: Boolean,
    highlight: Boolean,  
    date: Date  
});
var categoriesModel = mongoose.model('bongdas', categoriesChema);


 

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
    latest: function(res) {
        categoriesModel.find({}).sort({date: -1}).limit(10).exec( function(err, data){
            if (err) throw err;
           // console.log(data);
            res(data);
        }) 

        
    },
    mostView: function (res) {

        categoriesModel.find({}).sort({view: -1}).limit(10).exec( function(err, data){
            if (err) throw err;
           // console.log(data);
            res(data);
        }) 

    }

};
