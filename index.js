var express=require("express");
var app=express();
var students = require('./routes');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/views'));

app.use(session({secret: "Shh, its a secret!"}));
app.use(cookieParser());
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())

app.set('view engine','ejs');
app.use('/students',students);
app.get("/*",function(req,res){ 
    console.log(req.url);
    res.render('login',{message:"welcome to the login page"});
});


app.listen(8080,function(){
console.log("Listening on port 8080");
});