var express = require('express');
var exphbs  = require('express-handlebars');
//var dbcotroller = require('./controllers/dbcontroller');
//var homepagecontroller = require('./controllers/homepagecontroller');

var app = express();


app.engine('hbs', exphbs({
    defaultLayoutL: 'main.hbs',
    
}));
app.set('view engine', 'hbs');
app.set("views","./views")
app.use(express.static("views"));


app.use('/', require('./routes/home-category.route'));



app.listen(3000, ()=> {
    console.log('Web server is running at localhost 3000')
})