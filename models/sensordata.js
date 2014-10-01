// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var Sensorschema   = new mongoose.Schema({
  //EntryId: Number,
  SwitchboardId: {type: String, required: true},
  RoomId: {type: String, required: true},
  UUID: {type: String, required: true},
  MACID: {type: String,  required: true},
  Webhook: {type: String, required: true},
  Timestamp: {type : Date, default: Date.now},
  Motion: {type: Boolean, required: true},
  InsideTemp: {type: Number, required: true},
  Humidity: {type: Number, required: true},
  Lumosity: {type: Number, required: true},
  OutsideTemp: {type: Number, required: true},
  DeviceLoc: {type: [], required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Sensordata', Sensorschema);