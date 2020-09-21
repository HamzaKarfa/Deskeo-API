const mysql = require('mysql');

module.exports =
{
    dbConnect
}

function dbConnect() {
    return (
        mysql.createConnection({
            database: 'deskeo_app',
            host: "localhost",
            user: "root",
            password: ""
        })
    )
}