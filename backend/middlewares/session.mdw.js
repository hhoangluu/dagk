var session = require('express-session')
module.exports = function(app) {
    app.use(session({
        secret: 'matkhaucucmanh',
        resave: true,
        saveUnititialized: true
    }))
}