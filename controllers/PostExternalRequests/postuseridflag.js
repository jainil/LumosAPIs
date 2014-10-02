var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var requestify = require('requestify');

exports.internalpostuserid = function(webhook, username, password){

	requestify.request(webhook.concat("?idpwd"), {
    	method: 'POST',
    	body: {
        	"username": username,
        	"password": password
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