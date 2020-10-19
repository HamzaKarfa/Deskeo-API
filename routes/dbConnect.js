const mysql = require('mysql');

module.exports =
{
    dbConnect
}

function dbConnect() {
    return (
        mysql.createConnection({
            database: 'living_app',
            // database:'deskeo_app',
            host: "127.0.0.1",
            user: "living_app",
            password: "S6M7FCcWJeQjhNW"
            // user:'root',
            // password:''
        })
    )
}