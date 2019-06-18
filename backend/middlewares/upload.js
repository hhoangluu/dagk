var multer = require('multer');

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, `./public/imgaes/`);
  },
})

module.exports = function (app) {
  app.post('/upload', (req, res, next) => {
    multer({ storage }).single('fuMain')(req, res, err => {
      if (err) {
        return res.json({
          error: err.message
        })
      }

      res.json({

      });
    })
  })
}