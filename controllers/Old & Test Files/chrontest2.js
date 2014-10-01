var cronJob = require('cron').CronJob;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Lumostestdata3');
var Switch = require('./models/switchdata');
var flagontroller = require('./controllers/switchflag');
var currenttime = new Date();

new cronJob("*/5 * * * * *", function(){
var switchdata;
Switch.count({}, function(err, c)
  {
       console.log('Count is ' + c);
       Switch.find({}).sort({'Status._id': -1}).exec(function(err, switchdata){
       	var i;
       	for(i=0; i<c; i++){
       		var switches = switchdata[i];
      		//flagontroller.postswitchflag(switchdata[i]);       		
       		var statuscount = switches.Status.length;
       		var statuslist = switches.Status;
 			if (statuscount !=""){
       		var j = statuscount-1;
       		var comparison = statuslist[j].Trigger;
       		var lastupdated = statuslist[j].Lastupdated;

       		while ((comparison == "web")||(comparison == "manual")){
       			j=j-1;
       		};
       			if((currenttime.getHours()-lastupdated.getHours())>1){
					Switch.update({UUID: switchdata[i].UUID, SwitchPin: parseInt(switchdata[i].SwitchPin), MACID: switchdata[i].MACID}, 
					{'SwitchAutoMode':false},{upsert:true}, function(err, data) { 
					if(err){console.log(err)}; //check what's the issue
					console.log("check");
					});
				}
				else {
					Switch.update({UUID: switchdata[i].UUID, SwitchPin: parseInt(switchdata[i].SwitchPin), MACID: switchdata[i].MACID}, 
					{'SwitchAutoMode':true},{upsert:true}, function(err, data) { 
					if(err){console.log("err")}; //check what's the issue
					console.log("check2");
					});
				}
       	}
       	} 
	});
  });
}, null, true, "America/Los_Angeles");