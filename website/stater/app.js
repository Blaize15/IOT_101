// Require mqtt package**









// Requiring express package
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static( __dirname + "/public"));





// connect to mqtt://broker.hivemq.com  ** 








// Sending index.html file to root route.
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});



// Name and passwd variables.
let name;
let passwd;

// name and password post route
app.post("/", function(req, res){
    name = req.body.name;
    passwd = req.body.passwd;
   
    res.redirect("/main");
});

// variable to store command.
let command;






//** 
app.post("/main", function(req, res){
    command = req.body.command;















});







app.get("/main", function(req, res){
    if(passwd == "12345"){

        res.sendFile(__dirname + "/public/main.html");
    }else{
        res.write("Wrong password");
        res.send();
    }
});


//Server listning...
app.listen(process.env.PORT || 8000);

