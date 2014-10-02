var cron = require('cron');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LumosDatabase1');
var Sensordata = require('./models/sensordata');
var Device = require('./models/deviceidentity');
var requestify = require('requestify');
var Room = require('./models/roomdata');
var flagontroller = require('./controllers/switchflag');
var autoflag = require('./controllers/PostExternalRequests/postautoflag');
var currenttime = new Date();

function postpresenceflag (webhook, macid, presence){
	requestify.request(webhook.concat("?presence"), {
    	method: 'POST',
    	body: {
        	"presence": presence,
   			 },
    	headers: {

    		},
    	cookies: {

    		},
    	auth: {

    		},
    	dataType: 'form-url-encoded'        
			});	
};
//compare and assign presence value to all devices

var sensoruuid="";
var sensorroomid="";


function presenceflag(i, device, j, devicedata, presencearray){
	console.log("running-tertiary");
	if(j<=(devicedata.length)-1){
	var presenceroom;

	Sensordata.find({UUID: devicedata[j].UUID, MACID: devicedata[j].MACID}).sort({Timestamp:-1}).limit(1).exec(function(err, sensordata){
		if(err){console.log(err)};
		if(sensordata!=""){
		presencearray.push(sensordata[0].Motion);
		if (j == (devicedata.length-1)){
			console.log(presencearray);
			presenceroom=presencearray[0];
			for (var k=1; k<presencearray.length; k++){
				if (presencearray[k]!=presencearray[k-1]) {
					presenceroom ="invalid";
					break;
				}
				else {
				};
			};
			var pushdata = {presence: presenceroom, Lastupdated: new Date().getTime()}

			Room.update({UUID:sensordata[0].UUID, Roomid: devicedata[j].RoomId},{
				$push:{'Presence':pushdata}},{upsert:true}, function(err, data) {
					console.log(data);
					postpresenceflag(devicedata[j].webhook,devicedata[j].MACID,presenceroom);
				});

			console.log(presenceroom);
			sensormotion(i, device);
		}
		presenceflag(i, device, j+1, devicedata, presencearray);
	}
	});
	}
}

//Compare and find all other devices within the same room
var uuidholder="";
var roomidholder="";

function sensormotion(i, device){
	console.log("running-secondary");
	if (i<=(device.length)-1){
		if((uuidholder!= device[i].UUID) || (roomidholder != device[i].RoomId)){
	Device.find({RoomId:device[i].RoomId, UUID: device[i].UUID}).sort({UUID:1,RoomId:1}).exec(function(err,devicedata){
			if (err){console.log(err)};
			var presencearray= [];
			presenceflag((i+1), device, 0, devicedata, presencearray);
			roomidholder = devicedata[0].RoomId;
			uuidholder = devicedata[0].UUID;
		});
}
else {sensormotion((i+1), device);};
};
};

var cronJob= cron.job("*/5 * * * * *", function(){
	console.log("running-main");
	uuidholder="";
	roomidholder="";
	Device.find({}).exec(function(err, devicedata){
		if (err){console.log(err)}
		else{
		sensormotion(0, devicedata);};
	});
	});

cronJob.start();