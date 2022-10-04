const { response } = require("express")
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "elice05team09",
    database: "plogging"
})

connection.connect()


var name = "이름"
var profile = "프로필"

// connection.query(`CREATE TABLE plogging(
//     name VARCHAR(30),
//     profile VARCHAR(30)
// )`)

connection.query("INSERT INTO plogging (name, profile) VALUES(?, ?)",
[name, profile])

connection.query("SELECT * FROM plogging",
function(error, results, fields){
    // if (error) {
    //     console.log(error)
    // }
    console.log(results);
});

connection.end();