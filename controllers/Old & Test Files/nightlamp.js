var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Sensordata = require('../../models/sensordata');
var Switch = require('../../models/switchdata');
var currenttime = new Date();


exports.flagnightlamp = function (req,res, switchdata) {
			Sensordata.find({UUID: req.user._id, MACID:req.headers.macid}).limit(1).sort({'Timestamp': -1}).exec(function(err, sensordata){
				if((sensordata.Lumosity<3000) && (currenttime.getHours()>22 || currenttime.getHours()<7)){
					var pushdata= {switchflag: true, Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});
				}
				else {
					var pushdata2= {switchflag: false, Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata2}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});
				};
			});
};
