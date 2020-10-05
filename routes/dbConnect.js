const mysql = require('mysql');

module.exports =
{
    dbConnect
}

function dbConnect() {
    return (
        mysql.createConnection({
            database: 'living_app',
            host: "http://pma.onevalue.fr/db_structure.php?server=1&db=living_app",
            user: "living_app",
            password: "S6M7FCcWJeQjhNW"
        })
    )
}