var modelCategory = require('../models/categories.model')
var modelArticle = require('../models/articles.model')


modelCategory.connect();



module.exports = {
    index: (req, res, next) => {
       
       
        modelArticle.loadAll(function(dataArticle){
            articles = dataArticle;
           // console.log(articles);
            modelCategory.loadAll(function(dataCategory){
                categories = dataCategory;
                //console.log(categories);
                modelCategory.mostView(function(dataTopCategories) {
                    topCategories = dataTopCategories;
                    modelArticle.latest(function(dataArticlesLastes) {
                        ariclesLastes = dataArticlesLastes;
                        modelArticle.mostView(function(dataArticlesMostView) {
                            articlesMostView = dataArticlesMostView;
                            res.render('home', {
                                categories: categories,
                                articles: articles,
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
        var childCategory = req.params.childCategory;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catChildNav(function (dataCatNav) {
                navCategory = dataCatNav;
                modelArticle.articleByChild(function(dataArticlesByCat){
                    articlesByCat= dataArticlesByCat;
                    modelCategory.mostView(function(dataTopCategories) {
                        topCategories = dataTopCategories;
                        res.render('category', { 
                            categories: categories,
                            topCategories: topCategories,
                            articlesByCat: articlesByCat, 
                            navCategory: navCategory 
                        });
                    });
                },navCategory.child.name)
            }, childCategory);
            // console.log(categories);           
        });
    },
    categories: (req, res, next) => {
        var category = req.params.category;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catNav(function (dataCatNav) {
                navCategory = dataCatNav;
                modelArticle.articleByCat(function(dataArticlesByCat){
                    articlesByCat= dataArticlesByCat;
                    modelCategory.mostView(function(dataTopCategories) {
                        topCategories = dataTopCategories;
                        res.render('category', { 
                            categories: categories,
                            topCategories: topCategories,
                            articlesByCat: articlesByCat, 
                            navCategory: navCategory 
                        });
                    });
                },navCategory.category)
            }, category)
            // console.log(categories);           
        });
    }
}