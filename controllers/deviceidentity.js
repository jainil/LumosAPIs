// Load required packages
var Deviceidentity = require('../models/deviceidentity');
var Room = require('../models/roomdata');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var geocode = require('./latlong.js');
var offset = require('./offsettime.js');
var Email = require('./senderrormail.js');

//var address = "address=382424"; 
//'https://maps.googleapis.com/maps/api/timezone/json?location=23.6034810,88.6822510&timestamp=1331161200&key=AIzaSyC9tYV4xbXF-O_Gt79n1kTD-_HVZHOc1L8';

app.use(bodyParser.json());

// Create endpoint /api/deviceidentity for POST
exports.postdeviceidentity = function(req, res) {
  // Create a new instance of the device identity model
var deviceidentity = new Deviceidentity();

var apikey = "&key=AIzaSyC9tYV4xbXF-O_Gt79n1kTD-_HVZHOc1L8";
var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var url1 = "https://maps.googleapis.com/maps/api/timezone/json?location="
var city = req.user.City;
var pincode = String(req.user.Pincode);
var coordinates;
var coordinates = function(){
            geocode.findlatlong((url.concat(city.concat(pincode.concat(apikey)))), function(data){
            coordinates = data;
            var timeparamters = data.toString().concat("&timestamp=1331161200");
            offset.offsettime((url1.concat(timeparamters.concat(apikey))), function(time){
            var timeoffsetadd= time;            
            deviceidentity.UUID= req.user._id;
            deviceidentity.webhook= req.body.webhook;
            deviceidentity.MACID= req.body.MACID;
            deviceidentity.HomeId= req.user.HomeId;
            deviceidentity.RoomId= req.body.RoomId;
            deviceidentity.City= req.user.City;
            deviceidentity.Country= req.user.Country;
            deviceidentity.Pincode= req.user.Pincode;
            deviceidentity.Geocode= coordinates;
            deviceidentity.Timeoffset= timeoffsetadd;

  // Save the deviceidentity and check for errors
deviceidentity.save(function(err) {
    if (err)
      {res.send("500");
        console.log(err);
      Email.sendmail("Error in saving device data",JSON.stringify(err), function (error, body){
          if(error){console.log(error)};
          if(body){console.log(body)};
        });
      }
    else{
    res.send("200");}
  });
    });
            });
};
            // Set the deviceidentity properties that came from the POST data

coordinates();


Room.find({UUID:req.user._id, RoomId: req.body.RoomId}, function(err, data) {
          if (data ==""){
            var Roomdata= new Room();
            Roomdata.UUID= req.user._id;
            Roomdata.RoomId= req.body.RoomId;
            Roomdata.save(function(err){
              if (err)
                {console.log(err);
                Email.sendmail("Error in saving room data",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
                }
              else {
                console.log({ message: 'Device added to the list!', data: Roomdata });};
            });
          };
        });
};

// Create endpoint /api/deviceidentity for GET
exports.getdeviceidentity = function(req, res) {
  // Use the Beer model to find all beer
  Deviceidentity.find({ UUID: req.user._id}, function(err, deviceidentity) { //check
    if (err)
      {res.send("500");
      console.log(err);
      Email.sendmail("Error in retrieving device data",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      }
    else {
    res.json(deviceidentity);};
  });
};

// Create endpoint for roomlist
exports.getroomlist = function(req, res) {
  Room.find({UUID: req.user._id}).exec (function(err, roomlist) { //check
    if (err)
      {res.send("500");
      console.log(err);
      Email.sendmail("Error in retrieving all rooms for a user",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      }
    else{
      res.json(roomlist);};

  });
};

// Create endpoint /api/beers/:deviceidentityentryid for GET
exports.getroomwisepanellist = function(req, res) {
  Deviceidentity.find({UUID: req.user._id, RoomId: req.headers.roomid}).exec (function(err, devicelist) { //check
    if (err)
      {res.send("500");
      console.log(err);
      Email.sendmail("Error in retrieving particular list of devices in one room",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      }
    else{
      res.json(devicelist);};

  });
};

/*
// Create endpoint /api/beers/:beer_id for PUT
exports.putdeviceidentity = function(req, res) {
  // check the entire api
  Sensordata.update({ UUID: req.UUID, EntryId: req.params.EntryId }, { quantity: req.body.quantity }, function(err, num, raw) { //check
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};*/

// Create endpoint /api/beers/:beer_id for DELETE
exports.deletedeviceidentityentryid = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Deviceidentity.remove({_id:req.headers._id}, function(err) {
    if (err){
      console.log(err);
      Email.sendmail("Error in deleting device data",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      res.send("500");}
    else{
    res.send("200");};
  });
};