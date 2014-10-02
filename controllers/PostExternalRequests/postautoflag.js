var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var requestify = require('requestify');

exports.internalautoflag = function(webhook, autoflag, switchpin){
	requestify.request(webhook.concat("?fauto"), {
    	method: 'POST',
    	body: {
        	"auto": autoflag,
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