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
    origin: 'http://living-app.kaffein.agency:3001',
    optionsSuccessStatus: 200
}

app.post('/newUsers', cors(corsOptions), upload.single('image'), function (req, res) {
    console.log(req.body)
    //------------DB Process --------//
    var conn = sf.dbConnect()
    conn.connect(function(err) {
        if (err) throw err;
    });
    if (req.file && req.body.name) {
        
        var sql = "INSERT INTO users (phrases_of_day, image) VALUES ?";
        var values = [
        [req.body.name, req.file.path]
        ];
        conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        });
    } else if (req.body.name && req.file == undefined){
        
        var sql = "INSERT INTO users (phrases_of_day) VALUES ?";
        var values = [
        [req.body.name]
        ];
        conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        });
    } else if (req.body.name == '' && req.file ){
        var sql = "INSERT INTO users (image) VALUES ?";
        var values = [
        [req.file.path]
        ];
        conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        });
    }
    
});

app.listen('3003', function () {
    console.log('CORS-enabled web server listening on port 3003')
})

module.exports = app;