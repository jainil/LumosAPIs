// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our beer schema
var useridentityschema   = new mongoose.Schema({
    username: {
      type:String,
      unique: true,
      required: true
    },
    useremail: {
      type: String,
      unique: true,
      required:true
    },
//    UUID: {
//      type: String,
//      unique: true,
//    },
    password:{
      type: String,
      required: true
    },
    HomeId: {
      type: String,
      required: true
    },
    City: {
    type:String,
    required:true},     //might be redundant
    Country: {
    type:String,
    required:true}, //might be redundant
    Pincode: {
      type:Number,
      required:true},
});

// Execute before each user.save() call
useridentityschema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

useridentityschema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('Useridentity', useridentityschema);

