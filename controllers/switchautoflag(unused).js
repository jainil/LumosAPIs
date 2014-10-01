var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Switch = require('../models/switchdata');


app.use(bodyParser.json());

// Create endpoint /api/switchstatus for POST
exports.postswitchautoflag = function(req, res){

//var pushdata = {Auto: req.body.Auto, Lastupdated: new Date().getTime()};

		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{'SwitchAutoMode':req.body.Auto},{upsert:true}, function(err, data) { 
			if(err){
			res.send("500");
			console.log(err);}
			else {
			res.send("200");};
		});

};
//UUID: req.user._id, MACID: req.headers.macid
// Create endpoint /api/sensordata for GET
exports.getswitchautoflag = function(req, res){
		Switch.find({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}).sort({'Timestamp': -1}).
		exec(function(err,switchdatalist){
			if (err)
      		{res.send("500");
      		console.log(err)}
      		else {
    		res.json(switchdatalist);};
		});
};

// Create endpoint /api/sensordata for DELETE
exports.deleteswitchautoflag = function(req, res){

};

// Create endpoint /api/sensordata for PUT
exports.putswitchautoflag = function(req, res){

};