var model = require('../models/categories.model')


model.connect();

module.exports = {
    index: (req, res, next) => {
       
        var categories = undefined;
        model.loadAll(function(data){
            categories = data;
           // console.log(categories);
            res.render('home', { categories: categories });
        });
        // show index
        //console.log(categories);
        
        // categories.find({}, function (err, data) {
        //     console.log(data);
        //     if (err) throw err;
        //     res.render('home', { categories: data })
        // });
    }
}