// Load required packages
var mongoose = require('mongoose');

var status = new mongoose.Schema({
    switchstatus: Boolean,
    Trigger: String,
    Lastupdated: Date
});

var switchflag = new mongoose.Schema({
    switchflag: String,
    Lastupdated: Date
});

var switchcurrent = new mongoose.Schema({
    Current: Number,
    Lastupdated: Date
});

var switchautomode = new mongoose.Schema({
    Auto: Boolean,
    Lastupdated: Date
});

/*var switchmotionmode = new mongoose.Schema({
    Sensing: String,
    Lastupdated: Date
});*/

var switchschema = new mongoose.Schema({
    SwitchType: {type: String, required: true},
    SwitchName: {type: String, required: true},
    SwitchPin: {type: Number, required: true},
    UUID: {type: String, required: true},
    webhook: {type: String, required: true},
    MACID: {type: String, required: true},
    RoomId: {type: String, required: true},
    //latlong
    //timeoffset
    Status: [status],
    SwitchFlag: [switchflag],
    SwitchCurrent: [switchcurrent],
    SwitchAutoMode: String,
    //SwitchMotionMode: [switchmotionmode],
    DateAdded: {type : Date, default: Date.now},
});



module.exports = mongoose.model('switchdata', switchschema);
//exports.statusschema = mongoose.model('statusschema', statusschema);