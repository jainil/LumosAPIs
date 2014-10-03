var api_key = 'key-5ab3a732a8d91226f7f451aead2ece03';
var domain = 'getlumos.co';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'LumosServer <tarkeshwar@getlumos.co>',
  to: 'tarkeshwar@getlumos.co',
  subject: 'Error at Server',
  text: 'Tis will happen if server has issues.'
};

mailgun.messages().send(data, function (error, body) {
console.log(error);
  console.log(body);
});