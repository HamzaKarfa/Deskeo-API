const crypto = require('crypto');
const sf= require("./dbConnect")
const express = require('express');

const cors = require('cors');
const mime = require('mime');
const app = express();
const multer  = require('multer');

const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
  })
app.use(express.urlencoded());

var corsOptions = {
    origin: 'http://living-app.kaffein.agency:3001',
    optionsSuccessStatus: 200
}

app.post('/adminChoice', cors(corsOptions), upload.any(), function (req, res) {

    //------------DB Process --------//
    var conn = sf.dbConnect()
    conn.connect(function(err) {
        if (err) throw err;
    });
    if (req.body) {
        
        var sql = "INSERT INTO admin_choice (phrase_du_jour, image_full_screen,	multiple_image_full_screen) VALUES ?";
        var values = [
            [req.body.phraseDuJour,req.body.ImageFullScreen,req.body.MultipleImageFullScreen]
        ];
        conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        res.json('Votre ajout a bien été pris en compte')
        });
    }
    
});

app.listen('3006', function () {
    console.log('CORS-enabled web server listening on port 3006')
})

module.exports = app;