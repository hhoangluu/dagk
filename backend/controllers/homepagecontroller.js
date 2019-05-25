var modelCategory = require('../models/categories.model')
var modelArtical = require('../models/artical.model')


modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
       
       
        modelArtical.loadAll(function(dataArtical){
            articals = dataArtical;
           // console.log(articals);
            modelCategory.loadAll(function(dataCategory){
                categories = dataCategory;
                //console.log(categories);
                modelCategory.mostView(function(dataTopCategories) {
                    topCategories = dataTopCategories;
                    modelArtical.latest(function(dataArticlesLastes) {
                        ariclesLastes = dataArticlesLastes;
                        modelArtical.mostView(function(dataArticlesMostView) {
                            articlesMostView = dataArticlesMostView;
                            res.render('home', {
                                categories: categories,
                                articals: articals,
                                topCategories: topCategories,
                                ariclesLastes: ariclesLastes,
                                articlesMostView: articlesMostView  // !!! callback hell
                            });
                        })
                    })
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
    childCategories: (req, res, next) => {

        //console.log(req.params.category);
        //console.log(req.params.childCategory);
        //var category = req.params.category;
        var childCategory = req.params.childCategory;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catChildNav(function (dataCatNav) {
                navCategory = dataCatNav;
                res.render('category', { categories: categories, navCategory: navCategory });
                //console.log(navCategory);
            }, childCategory)
            // console.log(categories);           
        });
    },
    categories: (req, res, next) => {
        var category = req.params.category;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catNav(function (dataCatNav) {
                navCategory = dataCatNav;
                res.render('category', { categories: categories, navCategory: navCategory });
                console.log(navCategory);
            }, category)
            // console.log(categories);           
        });
    }
}