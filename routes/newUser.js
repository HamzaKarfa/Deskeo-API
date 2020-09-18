const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const mime = require('mime');
const app = express();
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});
const upload = multer({ storage: storage });

app.use(express.urlencoded());

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

app.post('/newUsers', cors(corsOptions), upload.single('image'), function (req, res) {

  console.log(req.file.path);
  console.log(req.body.name);

});

app.listen('3003', function () {
  console.log('CORS-enabled web server listening on port 3003')
})

module.exports = app;