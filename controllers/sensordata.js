// Load required packages
var Sensordata = require('../models/sensordata');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Device = require('../models/deviceidentity');
var Switch = require('../models/switchdata');
var Forecast = require('forecast');

// Initialize forecast module
var forecast = new Forecast({
  service: 'forecast.io',
  key: 'ad3c54c34383bee6b86451e95d4538d8',
  units: 'celsius', // Only the first letter is parsed
  cache: true,      // Cache API requests?
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 30,
    seconds: 00
    }
});

app.use(bodyParser.json());

// Create endpoint /api/sensordata for POST
exports.postsensordata = function(req, res) {

  // Create a new instance of the Sensordata model
var sensordata = new Sensordata();

Device.find({ UUID: req.user._id, MACID:req.headers.macid}).exec(function(err, devicedata){
          if(devicedata !=""){
            forecast.get(devicedata[0].Geocode, true, function(err, weather) {
                if(err) { console.log(err)};
                  console.log(weather.currently.temperature);
                  console.log(weather.currently.humidity);
                  sensordata.RoomId= devicedata[0].RoomId;
                  sensordata.SwitchboardId= devicedata[0]._id;
                  sensordata.Webhook= devicedata[0].webhook;
                  sensordata.UUID= req.user._id;
                  sensordata.MACID= req.headers.macid;
                  sensordata.Timestamp= new Date().getTime(); 
                  sensordata.Motion= req.body.Motion;
                  sensordata.InsideTemp= req.body.InsideTemp;
                  sensordata.Humidity= weather.currently.humidity;
                  sensordata.Lumosity= req.body.Lumosity;
                  sensordata.OutsideTemp= weather.currently.temperature; 
                  sensordata.DeviceLoc= devicedata[0].Geocode; 
  // Save the sensordata and check for errors
                    sensordata.save(function(err) {
                      if (err)
                      {res.send("50");
                      console.log(err);}
                      else {
                      console.log({ message: 'Sensordata added to the list!'});};
                      switchcurrent(0, sensordata);
                      });
              });

// Save the currentdata for every switch
  function switchcurrent(i, sensordata){
    if(req.body.PinCurrent !=""){
    if (i<(req.body.PinCurrent).length){
Switch.find({UUID: req.user._id, SwitchPin: ((req.body.PinCurrent[i]).SwitchPin), MACID: req.headers.macid}).exec(function(err,switchdatalist){
  if(switchdatalist !=""){
      var pushdata = {Current: ((req.body.PinCurrent[i]).Current), Lastupdated: new Date().getTime()};
      Switch.update({UUID: req.user._id, SwitchPin: ((req.body.PinCurrent[i]).SwitchPin), MACID: req.headers.macid}, 
      {$push:{'SwitchCurrent':pushdata}},{upsert:true}, function(err, data) {
        if(err){console.log(err)}
        else {
           switchcurrent(i+1);
            }
        //console.log(data);
    });
  }
  else {
    console.log("Switch Doesn't exist");
    switchcurrent(i+1);
  };
  });
}
else{
      console.log("200");
};

}
else{
  console.log({status: 200, Errortype: "Current data not supplied"});
};
};
}
else {
  res.send("500");
  console.log("Device for sensor Not Found");
};

});
};

// Create endpoint /api/sensordata for GET // stays a challenge
exports.getsensordata = function(req, res) {
  // Use the Beer model to find all beer
  Sensordata.find({MACID: req.headers.macid, UUID: req.user._id }, function(err, sensordata) { //check
    if (err)
      {res.send("500");
      console.log(err);}
    else {
    res.json(sensordata);};
  });
};

// Create endpoint /api/sensordata/:sensordataentryid for GET
exports.getsensordataentryid = function(req, res) {
  // Use the Beer model to find a specific beer
  Sensordata.find({ UUID: req.user._id, _id: req.params._id }, function(err, sensordata) { //check
    if (err){
        console.log(err);
        res.send("500");}
    else {
    res.json(sensordata);};
  });
};

/*
// Create endpoint /api/sensordata/:sensordataentryidfor PUT
exports.putsensordataentryid = function(req, res) {
  // check the entire api
  Sensordata.update({ UUID: req.UUID, EntryId: req.params.EntryId }, { quantity: req.body.quantity }, function(err, num, raw) { //check
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};*/

// Create endpoint /api/sensordata/:sensordataentryid for DELETE
exports.deletesensordataentryid = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Sensordata.remove({ UUID: req.user._id, _id: req.params._id }, function(err) {
    if (err)
      {res.send("500");
      console.log(err);}
    else {
    res.send("200");
    };
  });
};