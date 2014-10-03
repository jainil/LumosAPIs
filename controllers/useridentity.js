// Load required packages
var User = require('../models/useridentity');
var Email = require('./senderrormail.js');

// Create endpoint /api/useridentity for POST
exports.postuseridentity = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    //UUID: _id,
    useremail: req.body.useremail,
    HomeId: req.body.HomeId,
    City: req.body.City,
    Country: req.body.Country,
    Pincode:req.body.Pincode
  });

  user.save(function(err) {
    if (err)
      {console.log(err);
        Email.sendmail("Error in saving user data",JSON.stringify(err), function (error, body){
          if(error){console.log(error)};
          if(body){console.log(body)};
        });
        res.send("500")}
    else{
    res.send("200");
  };
  });
};

// Create endpoint /api/users for GET
exports.getuseridentity = function(req, res) {
  User.find(function(err, users) {
    if (err)
      {res.send(err);
        Email.sendmail("Error in retrieving user data",JSON.stringify(err), function (error, body){
          if(error){console.log(error)};
          if(body){console.log(body)};
        });}
    else
      {res.json(users);};
  });
};