var api_key = 'key-5ab3a732a8d91226f7f451aead2ece03';
var domain = 'getlumos.co';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.sendmail = function (Subject, Text, callback){
var data = {
  from: 'LumosServer <tarkeshwar@getlumos.co>',
  to: 'tarkeshwar@getlumos.co, sankherpritesh@gmail.com',
  subject: Subject,
  text: Text
};

mailgun.messages().send(data, function (error, body) {
//console.log(error);
  //console.log(body);
  callback(error, body);
});
}