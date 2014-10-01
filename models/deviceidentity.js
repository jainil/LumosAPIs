// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our device schema
var deviceidentityschema   = new mongoose.Schema({
    UUID: {type: String, required: true}, 
    webhook: {type: String, unique: true, required: true},
    MACID: {type: String, unique: true, required: true},
    HomeId: {type: String, required: true},
    RoomId: {type: String, required: true},
    City: {type: String, required: true},     //might be redundant
    Country: {type: String, required: true}, //might be redundant
    Pincode: {type: String, required: true},
    Geocode: {type: [], required: true}, //Device latlong will be taken from the google geocode api
    Timeoffset: {type: [], required: true} //Device TImeoffset will be takne from the google timezone api
});

// Export the Mongoose model
module.exports = mongoose.model('deviceidentity', deviceidentityschema);