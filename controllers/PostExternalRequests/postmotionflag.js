var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var requestify = require('requestify');

exports.internalpostmotionflag = function(webhook, motionflag, switchpin){
	requestify.request(webhook.concat("?motion"), {
    	method: 'POST',
    	body: {
        	"motion": motionflag,
        	"SwitchPin": switchpin
   			 },
    	headers: {

    		},
    	cookies: {

    		},
    	auth: {

    		},
    	dataType: 'form-url-encoded'        
			});	
}