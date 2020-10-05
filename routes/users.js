const express = require('express');
const cors = require('cors')
const app = express();
const sf= require("./dbConnect")
const FileAPI = require('file-api')
const File = FileAPI.File;
const FileReader = FileAPI.FileReader;

var corsOptions = {
    origin: 'http://living-app.kaffein.agency:3001',
    optionsSuccessStatus: 200
}
app.get('/users', cors(corsOptions), function (req, res, next) {
    var conn = sf.dbConnect()
    conn.connect(function(err) {
        if (err){ console.log(err)};
        console.log("Connected!");
    });

    function toBase64 (file1)  {
        return (
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file1);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            })
        )
    }
    async function encodeImage(results){
        let file = new File(results.image)
        let functionResult = await toBase64(file).then((data)=>{
            results.image = data
        }).then(()=>{
            return results
        })
         return functionResult
    }
    async function loopResult(results){
        if (results.image !== null) {
            
             let functionResult1 = await encodeImage(results)
             return functionResult1
        }else {
              return results
         }
    }
    var selectQuery = 'SELECT * FROM users';
    conn.query(
        selectQuery,
        async function select(error, results, fields) {
        let Array = []

            if (error) {
                console.log(error);
            }
            for (let i = 0; i < results.length; i++) {

                Array.push( await loopResult(results[i]))
            }
            // console.log('MOULAGA',Array)
            res.json(Array)
            conn.end();
        }
    )})

    
app.listen('3002', function () {
    console.log('CORS-enabled web server listening on port 3002')
})

module.exports = app;
