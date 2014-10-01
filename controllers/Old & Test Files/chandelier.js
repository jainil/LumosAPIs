var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Sensordata = require('../../models/sensordata');
var Switch = require('../../models/switchdata');
var currenttime = new Date();

exports.flagchandelier = function (req,res, switchdata) {
	Sensordata.find({UUID: req.user._id, MACID:req.headers.macid}).limit(1).sort({'Timestamp': -1}).exec(function(err,sensordata){
			if (switchdata.RoomId=="livingroom"){ //1
				
			}
			else if(switchdata.RoomId=="kitchen"){  //2

			}
			else if(switchdata.RoomId=="bedroom"){ //3

			}
			else if(switchdata.RoomId=="foyer"){ //4

			}
			else if(switchdata.RoomId=="outsidedoor"){ //5

			}
			else if(switchdata.RoomId=="gardens"){ //6

			}
			else if(switchdata.RoomId=="terrace"){ //7

			}
			else if(switchdata.RoomId=="balcony"){ //8

			}
			else if(switchdata.RoomId=="study"){ //9

			}
			else if(switchdata.RoomId=="dining"){ //10

			}
			else if(switchdata.RoomId=="stairs"){ //11

			}
			else if(switchdata.RoomId=="religionroom"){ //12

			}
			else {

			};
			});

};