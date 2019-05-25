var modelCategory = require('../models/categories.model')
var modelArtical = require('../models/artical.model')


modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
       
        var articals = undefined;
        var categories = undefined;
        var topCategories = undefined;
        modelArtical.loadAll(function(dataArtical){
            articals = dataArtical;
           // console.log(articals);
            
            modelCategory.loadAll(function(dataCategory){
                categories = dataCategory;
                //console.log(categories);
                modelCategory.mostView(function(dataTopCategories) {
                    topCategories = dataTopCategories;
                    res.render('home', { categories: categories, articals: articals, topCategories: topCategories });
                })
               
            });
        });
        // show index
        //console.log(categories);
        
        // categories.find({}, function (err, data) {
        //     console.log(data);
        //     if (err) throw err;
        //     res.render('home', { categories: data })
        // });
    },
    categories: (req, res, next) => {
        
        //console.log(req.params.category);
        var category = req.params.category;
        var categories = undefined;
        modelCategory.loadAll(function(data){
            categories = data;
           // console.log(categories);           
            res.render('category', {categories: categories, category: category});
        });
    }
}