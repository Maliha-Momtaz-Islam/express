var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://iot.eclipse.org')
var db = mongojs("mongodb://yoda:1@ds125195.mlab.com:25195/iotsecondbatch", ["sensordata"]);

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/showdata',function(req,res)
{
    db.sensordata.find(function(err,docs){
        if(err){
            res.send(err);
             };
        res.send(docs);
    });
})

app.post('/data',function(req,res){
    db.sensordata.save(req.body);
    res.json(req.body);
})
 
client.on('connect', function () {
  client.subscribe('maliha')
})
 
client.on('message', function (topic, message) {
  console.log(message.toString())
  db.sensordata.save(JSON.parse(message.toString()));
})

app.listen(3000,function(){
    console.log('example app listenting on port 3000');
})