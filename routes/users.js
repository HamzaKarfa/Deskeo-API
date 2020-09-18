const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

 
var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}
app.get('/users', cors(corsOptions), function (req, res, next) {
  
  var conn = mysql.createConnection({
    database: 'deskeo_app',
    host: "localhost",
    user: "root",
    password: ""
  });
   
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
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
              if ( results.length > i )  { 
                  allResult.push(results[i]);
                  resolve(allResult);
              } else {
                  console.log("Pas de données");
              }
          }
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
