var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'radar',
    password:'radarhomework',
    database:'RadarDB' 
});
module.exports=connection;