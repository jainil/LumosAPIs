var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Switch = require('../models/switchdata');


app.use(bodyParser.json());

// Create endpoint /api/switchstatus for POST
exports.postswitchstatus = function(req, res){

var pushdata = {switchstatus: req.body.switchstatus, Trigger: req.body.trigger, Lastupdated: new Date().getTime()};
	Switch.find({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}).exec(function(err, switchdata){
		if (err){console.log(err)}
		else {
		if (switchdata != ""){	
		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{$push:{'Status':pushdata}},{upsert:true}, function(err, data) {
				if ((req.body.trigger=="agent")||(req.body.trigger=="manual")){
				Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
				{$push:{'SwitchAutoMode':"false"}},{upsert:true}, function(err, data){ 
				if(err){console.log(err)}
				else {
				console.log(data);};
				});
				}; 
			if(err){
			res.send("500");
			console.log(err);}
			else {
			res.send("200");};
		});
		}
		else{
			res.send("500");
			console.log("Switch Not Found");
		}
		};
});
};

// Create endpoint /api/sensordata for GET
exports.getswitchstatus = function(req, res){
		Switch.find({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}).sort({'Timestamp': -1}).
		exec(function(err,switchdatalist){
			if (err){
      		res.send("500");
      		console.log(err);}
      		else{
    		var i = (switchdatalist[0].Status).length;
    		res.json(switchdatalist[0].Status[i-1]);};
		});
};

// Create endpoint /api/sensordata for DELETE
exports.deleteswitchstatus = function(req, res){
	Switch.remove({_id:req.headers._id}, function(err) {
    if (err){
      console.log(err);
      res.send("500");}
    else{
    res.send("200");};
  });
};

// Create endpoint /api/sensordata for PUT
exports.putswitchstatus = function(req, res){

};