module.exports = function(app) {
    var db = require('./dbcontroller')

    var thnewsChema = new db.Schema({
        category: String,
    });

    var categories = db.model('categories', thnewsChema);
    // show index
    app.get('/', function(req, res){
       
        categories.find({}, function(err, data) {
            console.log(data);
            if (err) throw err;
            res.render('home',{categories: data})
        })
    })
}