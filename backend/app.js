var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var morgan = require('morgan')
var createError = require('http-errors');
var multer = require('multer')
//var dbcotroller = require('./controllers/dbcontroller');
//var homepagecontroller = require('./controllers/homepagecontroller');

var app = express();


app.engine('hbs', exphbs({
    defaultLayoutL: 'main.hbs',
    helpers: {
        xoadau: str => {
            //console.log("Loi o day " + str);
            if (str == undefined) return str;
            str.trim();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            str = str.replace(/ /g, "-");
            // Gộp nhiều dấu space thành 1 space
            str = str.replace(/\s+/g, ' ');
            // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của xâu   
            


            return str;
        },
        formatDate: date => {
            if (!date) return;
            date = date.toLocaleDateString();
            //console.log(date);
            return date;

        },
        gretter(v1,v2) {
            return(v1 > v2)
        },

        equal(s1,s2)
        {
            return(s1===s2)
        },

        section: hbs_sections()


    }

}));

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
      cb(null, `./public/images/`);
    },
  })
  var upload = multer({storage: storage})
  app.post('/upload', upload.single('fuMain'), function(req,res){
      
     res.redirect('/writer/writer-addpost');
  })

app.set('view engine', 'hbs');
app.set("views", "./views")
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
//require('./middlewares/upload')(app);

app.use('', require('./routes/none.route'));
app.use('/home', require('./routes/home-category.route'));
app.use('/account', require('./routes/account.route'));
app.use('/admin', require('./routes/admin.route'));
app.use('/editor', require('./routes/editor.route'));
app.use('/writer', require('./routes/writer.route'));
app.use('/subcriber', require('./routes/subcriber.route'));
//app.use('/admin/categories', require('./routes/admin/category.route'));



app.get('/', (req, res) => {
    res.render('home');
})


// app.use((req, res, next) => {
//     res.render('404', { layout: false });
// })

app.use((req, res, next) => {
    // next(createError(err.status));
    next(createError(404));
})


app.use((err, req, res, next) => {
    var status = err.status || 500;
    var errorView = 'error';
    if (status === 404)
        errorView = '404';

    var msg = err.message;
    var error = err;
    //console.log('app.js duoi: ' + status);
    res.status(status).render(errorView, {
        layout: false,
        msg,
        error
    })

})


app.listen(process.env.PORT || 3000, () => {
    console.log('Web server is running at http://localhost:3000/home')
})