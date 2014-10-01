var cronJob = require('cron').CronJob;
var currenttime = new Date();
var Switch = require('../../models/switchdata');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
app.use(bodyParser.json());

exports.cronjob = function (req, Trigger,Lastupdated){
	if((currenttime.getHours()-Lastupdated.getHours())>1){
		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{'SwitchAutoMode':false},{upsert:true}, function(err, data) { 
			if(err){res.send(err)};
			console.log({message: 'Switch Status added to the list!', data: Switch});
		});
	}
	else {
		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{'SwitchAutoMode':true},{upsert:true}, function(err, data) { 
			if(err){res.send(err)};
			console.log({message: 'Switch Status added to the list!', data: Switch});
		});
	}

//console.log(cronJ);
	};


	/*
new cronJob('* * * * * *', function(Trigger,Lastupdated){
	console.log("working");
	if((currenttime.getHours()-Lastupdated.getHours())>1){
		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{'SwitchAutoMode':false},{upsert:true}, function(err, data) { 
			if(err){res.send(err)};
			console.log({message: 'Switch Status added to the list!', data: Switch});
		});
	}
	else {
		Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
			{'SwitchAutoMode':true},{upsert:true}, function(err, data) { 
			if(err){res.send(err)};
			console.log({message: 'Switch Status added to the list!', data: Switch});
		});
	}
	}
)

var cronJob = require('cron').CronJob;
var cronJ = new cronJob("00 29 16 6 * *", function() {
        console.log("Tick");
}, undefined, true, "America/Los_Angeles");

console.log(cronJ);

	*/