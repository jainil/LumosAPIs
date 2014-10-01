// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var presence = new mongoose.Schema({
    presence: String,
    Lastupdated: Date
});

var innertemp = new mongoose.Schema({
    innertemp: String,
    Lastupdated: Date
});

var humidity = new mongoose.Schema({
    humidity: String,
    Lastupdated: Date
});

var lumosity = new mongoose.Schema({
    lumosity: String,
    Lastupdated: Date
});

// Define our device schema
var roomdataschema   = new mongoose.Schema({
    UUID: {type: String, required: true},
    RoomId: {type: String, required: true},
    Presence: [presence],
    InnerTemp: [innertemp],
    Humidity: [humidity],
    Lumosity: [lumosity]
});

// Export the Mongoose model
module.exports = mongoose.model('roomdata', roomdataschema);