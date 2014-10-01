var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Sensordata = require('../../models/sensordata');
var Switch = require('../../models/switchdata');
var currenttime = new Date();


exports.flagregularlight = function (req,res, switchdata) {
			Sensordata.find({UUID: req.user._id, MACID:req.headers.macid}).limit(1).sort({'Timestamp': -1}).exec(function(err,sensordata){
			if (switchdata.RoomId == "Bedroom1") { //1 // needs to be changed
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "true")) {//will definitely throw in an error
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			else if(switchdata.RoomId=="kitchen"){  //2
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="bedroom"){ //3 needs to be changed
				if ((sensordata[0].Lumosity<3000) && (currenttime.getHours()<22 || currenttime.getHours()>7)
					&&(switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="foyer"){ //4
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="outsidedoor"){ //5
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="gardens"){ //6
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="terrace"){ //7
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Flag updated!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="balcony"){ //8
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="study"){ //9
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="dining"){ //10
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="stairs"){ //11
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});	
				}
			}
			else if(switchdata.RoomId=="religionroom"){ //12
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});	
				}
			}
			else {
					var pushdata= {switchflag: "off", Lastupdated: new Date().getTime()};
					Switch.update({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){res.send(err)};
						res.json({message: 'Switch Status added to the list!', data: Switch});
						});

			};
			}
			});	
};
