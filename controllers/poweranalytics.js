var Switch = require('../models/switchdata');
var bodyParser = require('body-parser');
var express = require('express');
var Email = require('./senderrormail.js');
var app = express();

app.use(bodyParser.json());


//send request shall also specifiy the start time and end time(in JSON format) for which it needs the data
exports.currentdata = function(req, res) {
	Switch.find({UUID: req.user._id, MACID: req.headers.macid, SwitchPin: req.headers.switchpin}).exec(function(err, switchdata){
		if (err){
			console.log(err);
			Email.sendmail("Error in finding switch to retrieve current data",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
		}
		else if(switchdata!=""){
		var currentdata=0;
		var timenew//=0;
		for (var i = (switchdata[0].SwitchCurrent).length - 1; i >= 0; i--) {
			var timecompareend= new Date(req.headers.datetimeend);
			var timecomparestart= new Date(req.headers.datetimestart);
			if (((switchdata[0].SwitchCurrent[i].Lastupdated)<=timecompareend) && ((switchdata[0].SwitchCurrent[i].Lastupdated)>=timecomparestart)) {
				timenew= switchdata[0].SwitchCurrent[i].Lastupdated;
				currentdata=currentdata+((switchdata[0].SwitchCurrent[i].Current)*20/3600);
			} 
			else{};
 			if (i == 0) {
 				res.json(currentdata);
 				console.log(currentdata);
 			} else{};
 		};

	}
	else {
		console.log(switchdata);
		Email.sendmail("No switch found while retrieving current data",JSON.stringify(err), function (error, body){
                if(error){console.log(error)};
                if(body){console.log(body)};
              });
		res.send("500");
	}
});

}