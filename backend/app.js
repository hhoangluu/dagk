var express = require('express');
var exphbs  = require('express-handlebars');
var dbcotroller = require('./controllers/dbcontroller');
var homepagecontroller = require('./controllers/homepagecontroller');

var app = express();
 

app.engine('hbs', exphbs({
    defaultLayoutL: 'main.hbs',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'hbs');
//app.set("views","./views")
app.use(express.static("views"));

app.get('/', function (req, res) {
    res.render('home');
});
 

app.use('/bong-da', require('./routes/guest/home-category.route'));



app.listen(3000, ()=> {
    console.log('Web server is running at localhost 3000')
})