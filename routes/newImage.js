const crypto = require('crypto');
const sf= require("./dbConnect")
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const mime = require('mime');
const app = express();
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
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

app.post('/newImage', cors(corsOptions), upload.any('image'), function (req, res) {

// console.log(req.files[0])
    //------------DB Process --------//
    var conn = sf.dbConnect()
    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    Object.keys(req.files).map((key)=> {
        console.log(req.files[key].path)
        var sql = "INSERT INTO image_full_screen (images_path) VALUES ?";
        var values = [
        [req.files[key].path]
        ];
        conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        });
    })
    
});

app.listen('3004', function () {
    console.log('CORS-enabled web server listening on port 3004')
})

module.exports = app;