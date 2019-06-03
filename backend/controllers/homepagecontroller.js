var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');
var modelUser = require('../models/user.model');
var bcrypt = require('bcrypt');
modelCategory.connect();



module.exports = {
    index: (req, res, next) => {


        modelArticle.loadAll(function (dataArticle) {
            articles = dataArticle;
            // console.log(articles);
            modelCategory.loadAll(function (dataCategory) {
                categories = dataCategory;
                //console.log(categories);
                modelCategory.mostView(function (dataTopCategories) {
                    topCategories = dataTopCategories;
                    modelArticle.latest(function (dataArticlesLastes) {
                        ariclesLastes = dataArticlesLastes;
                        modelArticle.mostView(function (dataArticlesMostView) {
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
        var category = req.params.category;
        var childCategory = req.params.childCategory;
        if(category == 'admin' || category == 'editor' || category == 'writer')
        {
            res.render(childCategory);
        }
        else
        {
            modelCategory.loadAll(function (data) {
                categories = data;
                modelCategory.catChildNav(function (dataCatNav) {
                    navCategory = dataCatNav;
                    modelArticle.articleByChild(function (dataArticlesByCat) {
                        articlesByCat = dataArticlesByCat;
                        modelCategory.mostView(function (dataTopCategories) {
                            topCategories = dataTopCategories;
                            res.render('category', {
                                categories: categories,
                                topCategories: topCategories,
                                articlesByCat: articlesByCat,
                                navCategory: navCategory
                            });
                        });
                    }, navCategory.child.name)
                }, childCategory);
                // console.log(categories);           
            });
        }
        
    },
    categories: (req, res, next) => {
        var category = req.params.category;
        if(category == 'admin' || category == 'editor' || category == 'writer')
        {
            res.render(category);
        }
        else
        {
            modelCategory.loadAll(function (data) {
                categories = data;
                modelCategory.catNav(function (dataCatNav) {
                    navCategory = dataCatNav;
                    modelArticle.articleByCat(function (dataArticlesByCat) {
                        articlesByCat = dataArticlesByCat;
                        modelCategory.mostView(function (dataTopCategories) {
                            topCategories = dataTopCategories;
                            res.render('category', {
                                categories: categories, // danh sách các danh mục   
                                topCategories: topCategories,   // các danh mục được xem nhiều nhất
                                articlesByCat: articlesByCat,   // bài viết theo danh mục
                                navCategory:  navCategory  // Thanh menu điều hướng theo danh mục
                            });
                        });
                    }, navCategory.category)
                }, category)
                // console.log(categories);           
            });
        }
        
    },

    loadPost: (req, res, next) => {
        var childCategory = req.params.childCategory;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catChildNav(function (dataCatNav) {
                navCategory = dataCatNav;
                var codePost = req.params.post;
                modelArticle.articlePost(function (dataPost) {
                    post = dataPost;
                    modelCategory.mostView(function (dataTopCategories) {
                        topCategories = dataTopCategories;
                        res.render('posts', {
                            categories: categories,
                            topCategories: topCategories,
                            post: post,
                            navCategory: navCategory
                        });
                    });
                    //console.log('day la post :' + post);    
                    //console.log('day la codePost :' + codePost);   
                }, codePost)
            }, childCategory);

        });
    },
    register: (req, res, next) => {
        var saltRounds = 10;
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        console.log('hash',hash);
        var entity = {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            email: req.body.email,
            permisson: 0
        }
        console.log(entity);
        modelUser.add(entity);
      

    }
}