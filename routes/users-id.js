// const express = require('express');
// const cors = require('cors')
// const app = express();
// const sf= require("./dbConnect")
// const FileAPI = require('file-api')
// const File = FileAPI.File;
// const FileList = FileAPI.FileList;
// const FileReader = FileAPI.FileReader;
// const fs = require('fs');
// var mime=require('mime-types');


// var corsOptions = {
//     origin: 'http://localhost:3001',
//     optionsSuccessStatus: 200
// }
// app.get('/:id', cors(corsOptions), function (req, res, next) {
//     console.log(req.params.id)
//     var conn = sf.dbConnect()
//     conn.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
//     var selectQuery = 'SELECT * FROM users WHERE id ='+req.params.id;
    
//     conn.query(
//         selectQuery,
//         function select(error, results, fields) {
//             if (error) {
//                 console.log(error);
//                 conn.end();
//                 return;
//             }
//             console.log(results[0])
//             if (results[0].image !== null) {
//                 let encodedImg
//                 const toBase64 = file1 => new Promise((resolve, reject) => {
//                     const reader = new FileReader();
//                     reader.readAsDataURL(file1);
//                     reader.onload = () => resolve(reader.result);
//                     reader.onerror = error => reject(error);
//                 });
                
//                 async function  Main()   {
//                    return new File(results[0].image);
//                 }
//                 Main()
//                 .then((result) => {
//                      encodedImg = toBase64(result)
//                      return encodedImg
//                 })
//                 .then((data) => {
//                     res.json({ 'phrase' : results[0].phrases_of_day, 'img' : data.toString() })
//                 })
//                 .catch((err) => {
                    
//                 });
//             } else {
//                 res.json({ 'phrase' : results[0].phrases_of_day, 'img' : '' })
//             }
//             conn.end();
//         }
//     )

  

// });

// app.listen('3004', function () {
//     console.log('CORS-enabled web server listening on port 3002')
// })

// module.exports = app;