var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var requestify = require('requestify');
var Switch = require('../models/switchdata');

exports.webpostturnon = function(req,res){
	var webhook;
	var OnOff;
	var Trigger;
	Switch.find({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}).exec(function(err, switchdata){
		if (err){
            console.log(err);
            res.send("500");
        }
        else{
            console.log(switchdata[0].webhook);
        webhook = (switchdata[0].webhook).concat("?switch");
		OnOff = req.body.onoff;
		Trigger = req.body.trigger;
		switchpin = req.headers.switchpin;
	requestify.request(webhook, {
    	method: 'POST',
    	body: {
        	OnOff: OnOff,
        	Trigger: Trigger,
        	SwitchPin: switchpin
   			 },
    	headers: {
    		},
    	cookies: {
    		},
    	auth: {
    		},
    	dataType: 'json'        
			});
    res.send("200");
	};
    });
};

exports.internalpostturnon = function(webhook,switchpin,onoff,trigger){
	requestify.request(webhook, {
    	method: 'POST',
    	body: {
        	Status: onoff,
        	Trigger: trigger,
        	SwitchPin: switchpin
   			 },
    	headers: {
        	//'X-Forwarded-By': 'me'
    		},
    	cookies: {
        	//mySession: 'some cookie value'
    		},
    	auth: {
        	//username: 'foo',
        	//password: 'bar'
    		},
    	dataType: 'json'        
			});
}

/*exports.getturnon = function(req,res){
	Switch.find({UUID: req.user._id, SwitchPin: parseInt(req.headers.switchpin), MACID: req.headers.macid}).exec(function(){

	});

}*/