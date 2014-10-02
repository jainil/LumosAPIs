// Load required packages
var passport = require('passport');
var passport2= require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BasicStrategy2 = require('passport-http').BasicStrategy;
var User = require('../models/useridentity');



passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { 
       // res.send("Invalid Username");
       console.log("error username");
        return callback("Invalid Username", false); };

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { 
         // res.send("Wrong Password");
         console.log(err);
          return callback(err); };

        // Password did not match
        if (!isMatch) { 
         // res.send("password didn't match");
         console.log("password didn't match")
          return callback("wrong password", false); }

        // Success
        return callback(null, user);
      });
    });
  }
));


exports.isAuthenticated = passport.authenticate('basic', { session : false });

