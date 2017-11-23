var express = require('express');
var app = express();
var mongojs = require('mongojs')
var bodyParser = require('body-parser');
var db = mongojs( "mongodb://yoda:1@ds125195.mlab.com:25195/iotsecondbatch" , ["sensordata"]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/showdata',function(req,res)
{
    db.sensordata.find(function(err,docs){
     if(err){
          res.send(err);
           };
        res.send(docs);
          
    });
})

app.post('/postdata',function(req,res){
        db.sensordata.save(err,req.body);
        res.json(req.body);
})

var server = app.listen(8081, function () {
    
       var host = server.address().address
       var port = server.address().port
    
       console.log("Example app listening at http://%s:%s", host, port)
    }) 

// This responds with "Hello World" on the homepage
/**app.get('/1/Sound/', function (req, res) {
   console.log("I am sound sensor");
   res.send('GET soound sensor data');
})

app.get('/1/Temp/', function (req, res) {
    console.log("I am tempurature sensor");
    res.send('GET tempurature sensor data');
 })

 app.get('/1/Light/', function (req, res) {
    console.log("I am light sensor");
    res.send('GET light sensor data');
 })*/

