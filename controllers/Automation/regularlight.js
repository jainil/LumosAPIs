var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Sensordata = require('../../models/sensordata');
var Switch = require('../../models/switchdata');
var motionflag = require('../../controllers/PostExternalRequests/postmotionflag');
var lumosityflag = require('../../controllers/PostExternalRequests/postlumosityflag');
var currenttime = new Date();


exports.flagregularlight = function (switchdata) {	
			console.log("awesometop");
			Sensordata.find({UUID: switchdata.UUID, MACID:switchdata.MACID}).limit(1).sort({'Timestamp': -1}).exec(function(err,sensordata){
			var flagindex = switchdata.SwitchFlag.length;
			if(flagindex == 0) {flagindex+=1};	
			if (switchdata.RoomId == "Bedroom1") { //1 // needs to be changed
				console.log("awesomebottom");
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "true")) {
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome1");
							});	
					//motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					//lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="kitchen"){  //2
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "false")){
					if ((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome2");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="bedroom"){ //3 needs to be changed
				if ((sensordata[0].Lumosity<3000) && (currenttime.getHours()<22 || currenttime.getHours()>7)
					&&(switchdata[0].SwitchAutoMode.Auto == false)){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome3");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
				else{

					}
				}
			}
			else if(switchdata.RoomId=="foyer"){ //4
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "false")){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome4");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="outsidedoor"){ //5
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "false")){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome5");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="gardens"){ //6
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "false")){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome6");
							});	
				motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
				lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
				}
				else{

				}
				}
			}
			else if(switchdata.RoomId=="terrace"){ //7
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "false")){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome7");
							});	
				motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
				lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);				
				}
				else{

				}
				}
			}
			else if(switchdata.RoomId=="balcony"){ //8
				if ((sensordata[0].Lumosity<3000) && (switchdata.SwitchAutoMode == "false")){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
					var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
					Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
						{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
						if(err){console.log(err)};
						console.log("awesome8");
						});	
				motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
				lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
				}
				}
			}
			else if(switchdata.RoomId=="study"){ //9
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome9");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="dining"){ //10
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome10");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);					
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="stairs"){ //11
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome11");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else if(switchdata.RoomId=="religionroom"){ //12
				if ((sensordata[0].Lumosity<3000) && (switchdata[0].SwitchAutoMode.Auto == false)){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome12");
							});	
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
			}
			else {
				console.log(switchdata);
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="off")){
						var pushdata= {switchflag: "off", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){console.log(err)};
							console.log("awesome-else");
							});
					//motionflag.internalpostmotionflag(switchdata.webhook, "off", switchdata.switchpin);
					//lumosityflag.internalpostlumosityflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{
					}
				};
			}
			);	
};
