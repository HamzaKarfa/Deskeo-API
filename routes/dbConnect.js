const mysql = require('mysql');

module.exports =
{
    dbConnect
}

function dbConnect() {
    return (
        mysql.createConnection({
            database: 'living_app',
            host: "localhost",
            user: "living_app",
            password: "S6M7FCcWJeQjhNW"
        })
    )
}