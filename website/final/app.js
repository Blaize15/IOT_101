const mqtt = require("mqtt");
const express = require("express");

const client  = mqtt.connect('mqtt://broker.hivemq.com')
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static( __dirname + "/public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

let name;
let passwd;

app.post("/", function(req, res){
    name = req.body.name;
    passwd = req.body.passwd;
   
    res.redirect("/main");
});


let command;

app.post("/main", function(req, res){
    command = req.body.command;
    if(command == "on" || command == "ON" || command == "On"){
        
        client.publish("iot", "on");
        res.send("LED STATE : ON");
        
          

    }else if(command == "off" || command == "OFF" || command == "Off"){
        

        client.publish("iot", "off");
        res.send("LED STATE : OFF");
        
    }
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

