// Load required packages
var User = require('../models/useridentity');

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
      {res.send(err);}
    else
      {res.json(users);};
  });
};