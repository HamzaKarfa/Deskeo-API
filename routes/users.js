const express = require('express');
const cors = require('cors')
const app = express();
const sf= require("./dbConnect")
const FileAPI = require('file-api')
const File = FileAPI.File;
const FileList = FileAPI.FileList;
const FileReader = FileAPI.FileReader;
const fs = require('fs');
var mime=require('mime-types');

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}
app.get('/users', cors(corsOptions), function (req, res, next) {
    let encodedImg
    var conn = sf.dbConnect()
    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });


    function encodeImage(imagePath){
        const toBase64 = file1 => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file1);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        
        async function  Main()   {
           return new File(imagePath);
        }
        return (Main()
        .then((result) => {
             file = toBase64(result)
             return file
        })
        .then((data) => {
            encodedImg = data
            return data
        }))
         
    }
    var selectQuery = 'SELECT * FROM users';
    const promise1 = new Promise((resolve, reject) => {
    conn.query(
        selectQuery,
        function select(error, results, fields) {
            if (error) {
                console.log(error);
                conn.end();
                return;
            }
            let allResult = []
            for (let i = 0; i < results.length; i++) {
                if ( results.length !== 0 )  { 
                    console.log(results[i]);
                    if (results[i].image !== null) {
                        encodeImage(results[i].image)
                        .then(()=> {
                            results[i].image = encodedImg
                            allResult.push(results[i]);
                            resolve(allResult);
                        })
                    }else {
                        allResult.push(results[i]);
                    }
                }
            }
            console.log(allResult)

            conn.end();
        }
    )})

    promise1.then((allResult) => renderPage(allResult))
    function renderPage(allResult) {
        res.json(allResult)
    }
});

app.listen('3002', function () {
    console.log('CORS-enabled web server listening on port 3002')
})

module.exports = app;
