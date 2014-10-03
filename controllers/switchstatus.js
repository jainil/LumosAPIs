var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Switch = require('../models/switchdata');
var Email = require('./senderrormail.js');

app.use(bodyParser.json());

// Create endpoint /api/switchstatus for POST
exports.postswitchstatus = function(req, res){

var pushdata = {switchstatus: req.body.switchstatus, Trigger: req.body.trigger, Lastupdated: new Date().getTime()};
	Switch.find({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}).exec(function(err, switchdata){
		if (err){console.log(err);
            Email.sendmail("Error in finding switch during storing switch status",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
		}
		else {
		if (switchdata != ""){
		if (req.body.switchstatus!=undefined){
		console.log(req.body.switchstatus);	
		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{$push:{'Status':pushdata}},{upsert:true}, function(err, data) {
				if ((req.body.trigger=="agent")||(req.body.trigger=="manual")){
				Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
				{'SwitchAutoMode':"false"},{upsert:true}, function(err, data){ 
				if(err){console.log(err);
					Email.sendmail("Error in changing switch auto mode",JSON.stringify(err), function (error, body){
                		if(error){console.log(error)};
                		if(body){console.log(body)};
              		});
				}
				else {
				console.log(data);};
				});
				}; 
			if(err){
			res.send("500");
			console.log(err);
            Email.sendmail("Error in adding the switch status",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
			}
			else {
			res.send("200");};
		});
		}
		else {
			res.send("500");
		}
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
      		console.log(err);
            Email.sendmail("Error in getting switch status",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
      		}
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
      res.send("500");
       Email.sendmail("Error in deleting switch status",JSON.stringify(err), function (error, body){
          if(error){console.log(error)};
          if(body){console.log(body)};
           });
  	}
    else{
    res.send("200");};
  });
};

// Create endpoint /api/sensordata for PUT
exports.putswitchstatus = function(req, res){

};