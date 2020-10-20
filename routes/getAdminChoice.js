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
app.get('/getAdminChoice', cors(corsOptions), function (req, res, next) {

    var conn = sf.dbConnect()
    conn.connect(function(err) {
        if (err){ console.log(err)};
    });

 
        
    
        var selectQuery = 'SELECT * FROM admin_choice ORDER BY ID DESC LIMIT 1'
        
        conn.query(
            selectQuery,
            async function select(error, results, fields) {
                let phraseDuJourId = JSON.stringify(results[0].phrase_du_jour)
                // let image_full_screen = JSON.stringify(results[0].image_full_screen)

                let image_full_screen
                if (results[0].image_full_screen == '') {
                    image_full_screen = []
                } else {
                    image_full_screen = results[0].image_full_screen.split(',');
                }

                let multiple_image_full_screen
                if (results[0].multiple_image_full_screen == '') {
                    multiple_image_full_screen = []
                } else {
                    multiple_image_full_screen = results[0].multiple_image_full_screen.split(',');
                }
                //Select Phrase du jour 

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
                    let file = new File(results)
                    let functionResult = await toBase64(file).then((data)=>{
                        results = data
                    }).then(()=>{
                        return results
                    })
                    return functionResult
                }
                async function loopResult(results){
                    if (results !== null) {
                        
                        let functionResult1 = await encodeImage(results)
                        return functionResult1
                    }else {
                        return results
                    }
                } 
                let Array = []
                //--------------------image_full_screen-----------------//
                    var selectQuery = "SELECT * FROM users WHERE id="+ phraseDuJourId
                    conn.query(
                        selectQuery,
                        async function select(error, results, fields) {
                            
                            if (results.length !== 0) {
                                Array.push( {'phrase': results[0].phrases_of_day,'image': await loopResult(results[0].image)})
                            } else{
                                Array.push( {'phrase':null,'image':null})
                            } 

                            //--------------------image_full_screen-----------------//
                            
                            if (image_full_screen.length !==0) {
                                let imageFullscreen=[]                         
                                for (let j = 0; j <= image_full_screen.length; j++) {
                                    var selectQuery2 = "SELECT * FROM image_full_screen WHERE id="+ image_full_screen[j]
                                    conn.query(
                                        selectQuery2,
                                        async function select(error, results, fields) {

                                            if (results !== undefined && results.length !== 0) {
                                                imageFullscreen.push( await loopResult(results[0].images_path))
                                            }
                                            if (imageFullscreen.length == image_full_screen.length) { 
                                                Array.push({'imageFullscreen':imageFullscreen})                              
                                            }
                                            
                                            //--------------------multiple_image_full_screen-----------------//
                                            
                                            if (j === image_full_screen.length-1) {
                                                if (multiple_image_full_screen.length !==0  ) {
                                                    let ArrayImage=[]                         
                                                    for (let i = 0; i < multiple_image_full_screen.length; i++) {
                                                        
                                                        var selectQuery3 = "SELECT * FROM image_full_screen WHERE id="+ multiple_image_full_screen[i]
                                                        conn.query(
                                                            selectQuery3,
                                                            async function select(error, results, fields) {   
                                                                
                                                                if (results !== undefined && results.length !== 0) {
                                                                    ArrayImage.push( await loopResult(results[0].images_path))
                                                                }
                                                                if (ArrayImage.length === multiple_image_full_screen.length) { 
                                                                    Array.push({ArrayImage})                              

                                                                    res.json(Array)
                                                                    conn.end();
                                                                } 
                                                                
                                                            }
                                                            )
                                                    }
                                                } else {
                                                    Array.push(null) 

                                                    res.json(Array)
                                                    conn.end();
                                                } 
                                            }

                                        }
                                    )
                                }
                            }else{
                                
                                Array.push(null)
                                if (multiple_image_full_screen.length !==0  ) {
                                    let ArrayImage=[]                         
                                    for (let i = 0; i < multiple_image_full_screen.length; i++) {
                                        
                                        var selectQuery3 = "SELECT * FROM image_full_screen WHERE id="+ multiple_image_full_screen[i]
                                        conn.query(
                                            selectQuery3,
                                            async function select(error, results, fields) {   
                                                
                                                if (results !== undefined && results.length !== 0) {
                                                    ArrayImage.push( await loopResult(results[0].images_path))
                                                }
                                                if (ArrayImage.length === multiple_image_full_screen.length) { 
                                                    Array.push({ArrayImage})                              

                                                    res.json(Array)
                                                    conn.end();
                                                } 
                                                
                                            }
                                            )
                                    }
                                } else {
                                    Array.push(null) 
                                    res.json(Array)
                                    conn.end();
                                } 
                            }
                        }
                    )
            }
        ) //endQuery
})

    
app.listen('3007', function () {
    console.log('CORS-enabled web server listening on port 3007')
})

module.exports = app;