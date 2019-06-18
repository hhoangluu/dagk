var modelCategory = require('../models/categories.model');
var modelArticle = require('../models/articles.model');


modelCategory.connect();



module.exports = {
    index: (req, res, next) => {


        modelArticle.loadAllPublic(function (dataArticle) {
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

    
    categories: (req, res, next) => {
        var category = req.params.category;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catNav(function (dataCatNav) {
                if (!dataCatNav) {
                    console.log('category : ' + category);
                    return res.render('errorname');
                }
                navCategory = dataCatNav;
                modelArticle.articleByCat(function (dataArticlesByCat) {
                    articlesByCat = dataArticlesByCat;
                    modelCategory.mostView(function (dataTopCategories) {
                        topCategories = dataTopCategories;
                        res.render('category', {
                            categories: categories, // danh sách các danh mục   
                            topCategories: topCategories,   // các danh mục được xem nhiều nhất
                            articlesByCat: articlesByCat,   // bài viết theo danh mục
                            navCategory: navCategory  // Thanh menu điều hướng theo danh mục
                        });
                    });
                }, navCategory.category)
            }, category)
            // console.log(categories);           
        });
        // if(category == 'admin' || category == 'editor' || category == 'writer')
        // {
        //     res.render(category);
        // }
        // else 
        // {

        // }
        // if(err)
        // {
        //     return next(err);
        // }
    },

    childCategories: (req, res, next) => {
        var category = req.params.category;
        var childCategory = req.params.childCategory;
        var page = req.query.page || 1;
        if (page < 1) page = 1;
        var limit = 1;
        var offset = (page - 1) * limit;
       
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catNav(function (dataCatNav) {
                if (!dataCatNav) {
                    console.log('category : ' + category);
                    console.log('cate/child: ' + category + '/' + childCategory);
                    return res.render('errorname');
                }
                modelCategory.catChildNav(function (dataChild) {
                    if (!dataChild) {
                        console.log('childcategory :')
                        console.log('cate/child: ' + category + '/' + childCategory);
                        return res.render('errorname');
                    }
                    navCategory = dataChild;
                    modelArticle.articleCountByChild(function(count) {
                        npages = Math.floor(count / limit);
                        console.log(npages);
                        console.log(count);
                        var pages=[];
                        for(i = 1;i<= npages;i++){
                            var obj = {
                                value: i,
                                active: i === +page
                            }
                            pages.push(obj);
                        }
                        modelArticle.articleByChildLimit(function (dataArticlesByCat) {
                            articlesByCat = dataArticlesByCat;

                            modelCategory.mostView(function (dataTopCategories) {
                                topCategories = dataTopCategories;
                                res.render('category', {
                                    categories: categories,
                                    topCategories: topCategories,
                                    articlesByCat: articlesByCat,
                                    navCategory: navCategory,
                                    pages: pages
                                });
                            });
                        }, navCategory.child.name, limit, offset);
                    }, navCategory.child.name);

                }, childCategory);
                // console.log(categories);
            }, category);

        });


        // if(category == 'admin' || category == 'editor' || category == 'writer')
        // {
        //     res.render(childCategory);
        // }
        // else
        // {
        // }
        // // if(err)
        // // {
        // //     return next(err);
        // // }
        
    },

    loadPost: (req, res, next) => {
        var childCategory = req.params.childCategory;
        modelCategory.loadAll(function (data) {
            categories = data;
            modelCategory.catChildNav(function (dataCatNav) {
                if (!dataCatNav) return next();
                navCategory = dataCatNav;
                var codePost = req.params.post;
                modelArticle.articlePost(function (dataPost) {
                    if (!dataPost) return next();
                    post = dataPost;
                    modelArticle.articleByChildLimit(function (dataSameCat) {
                        dataSameCat = dataSameCat;
                        res.render('posts', {
                            categories: categories,
                            dataSameCat: dataSameCat,
                            post: post,
                            navCategory: navCategory
                        });
                    },navCategory.child.name, 5, 1);
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
      

    },

}