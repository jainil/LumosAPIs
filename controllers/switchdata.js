var Deviceidentity = require('../models/deviceidentity');
var Switch = require('../models/switchdata');
var bodyParser = require('body-parser');
var express = require('express');
var Email = require('./senderrormail.js');
var app = express();

app.use(bodyParser.json());

// Create endpoint /api/switchdata for POST
exports.postswitchdata = function(req, res) {
	var switchdata = new Switch();
Deviceidentity.find({UUID: req.user._id, MACID: req.headers.macid}).exec(function(err, deviceidentity){
	if (deviceidentity=="") {res.send("Not found")}
    else {
      switchdata.SwitchType= req.body.SwitchType;
      switchdata.SwitchName= req.body.SwitchName;
      switchdata.SwitchPin= req.body.SwitchPin;
      switchdata.UUID= req.user._id;
      switchdata.webhook= deviceidentity[0].webhook;
      switchdata.RoomId=deviceidentity[0].RoomId;
      switchdata.MACID= req.headers.macid;
      switchdata.DateAdded= new Date().getTime(); 

switchdata.save(function(err) {
    
    if (err)
      {res.send("500");
      console.log(err);
      Email.sendmail("Error in saving switchdata",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      }
    else {
    res.send("200");};
  //};
});
};
})
};

// Create endpoint /api/switchdata for GET
exports.getswitchdata = function(req, res) {
  // Use the Beer model to find all beer
  Switch.find({UUID: req.user._id, MACID: req.headers.macid, SwitchPin: req.headers.switchpin}, function(err, switchdata) { //check
    if (err)
      {res.send("500");
      console.log(err);
      Email.sendmail("Error in finding switch through switchdata.js",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      }
    else {
      res.json(switchdata);};
  });
};


// Create endpoint /api/sensordata for DELETE
exports.deleteswitchdata = function(req, res){

};

// Create endpoint /api/sensordata for PUT
exports.putswitchdata = function(req, res){

};