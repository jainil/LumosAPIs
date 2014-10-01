var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var requestify = require('requestify');

exports.internalpresenceflag = function(webhook, presence, switchpin){
	requestify.request(webhook.concat("?presence"), {
    	method: 'POST',
    	body: {
        	"presence": autoflag,
   			 },
    	headers: {

    		},
    	cookies: {
 
    		},
    	auth: {

    		},
    	dataType: 'json'        
			});	
}