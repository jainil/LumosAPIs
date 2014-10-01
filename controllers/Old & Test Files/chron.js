var cronJob = require('cron').CronJob;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Lumostestdata3');
var Switch = require('./models/switchdata');

new cronJob('*/20 * * * * *', function(){
	var switchdata;
	Switch.find({}).sort({'Timestamp': -1}).
		exec(function(err,switchdatalist){
			if (err)
      		console.log(err);

    		console.log(switchdatalist);
		});
    //console.log(switchdata);
    console.log("sexy");
}, null, true, "America/Los_Angeles");