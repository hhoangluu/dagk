var modelCategory = require('../models/categories.model')
var modelArtical = require('../models/artical.model')


modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
       
        var articals = undefined;
        var categories = undefined;
        modelArtical.loadAll(function(dataArtical){
            articals = dataArtical;
            console.log(articals);
            
            modelCategory.loadAll(function(dataCategory){
                categories = dataCategory;
                //console.log(categories);
                res.render('home', { categories: categories, articals: articals });
            });
        });



    }
}