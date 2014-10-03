var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Sensordata = require('../../models/sensordata');
var Switch = require('../../models/switchdata');
var Email = require('../../controllers/senderrormail.js');
var motionflag = require('../../controllers/PostExternalRequests/postmotionflag');

var currenttime = new Date();


exports.flagairconditioner = function (switchdata) {
			Sensordata.find({UUID: switchdata.UUID, MACID: switchdata.MACID}).sort({'Timestamp': -1}).limit(1).exec(function(err, sensordata){
				var flagindex = switchdata.SwitchFlag.length;
				if(flagindex == 0){flagindex+=1};
				if(sensordata[0].InsideTemp>24){
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="true")){
						var pushdata= {switchflag: "true", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata}},{upsert:true}, function(err, data) { 
							if(err){res.send(err);
					          Email.sendmail("Error in pushing switchflag in airconditioner.js",JSON.stringify(err), function (error, body){
        				        if(error){console.log(error)};
                				if(body){console.log(body)};
              					});	
					      };
							console.log(data);
							});
					motionflag.internalpostmotionflag(switchdata.webhook, "true", switchdata.switchpin);
					}
					else{

					}
				}
				else {
					if((switchdata.SwitchFlag=="")||(switchdata.SwitchFlag[flagindex-1].switchflag !="false")){
						var pushdata2= {switchflag: "false", Lastupdated: new Date().getTime()};
						Switch.update({UUID: switchdata.UUID, SwitchPin: parseInt(switchdata.SwitchPin), MACID: switchdata.MACID}, 
							{$push:{'SwitchFlag':pushdata2}},{upsert:true}, function(err, data) { 
							if(err){res.send(err);
					          Email.sendmail("Error in pushing switchflag in airconditioner.js",JSON.stringify(err), function (error, body){
        				        if(error){console.log(error)};
                				if(body){console.log(body)};
              					});	};
							console.log(data);
							});
					motionflag.internalpostmotionflag(switchdata.webhook, "false", switchdata.switchpin);
					}
					else{

					}
				}
			});
};
