var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var requestify = require('requestify');

exports.internalpostlumosityflag = function(webhook, lumosityflag, switchpin){
	requestify.request(webhook.concat("?lumosity"), {
    	method: 'POST',
    	body: {
        	"lumosity": lumosityflag,
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