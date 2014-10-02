var cron = require('cron');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LumosDatabase1');
var Switch = require('./models/switchdata');
var flagcontroller = require('./controllers/switchflag');
var autoflag = require('./controllers/PostExternalRequests/postautoflag');
var currenttime = new Date();

function switchautoflag(i, switchdata){
      //console.log("weird");
      //console.log(switchdata.length);
        if(i<switchdata.length){
        flagcontroller.postswitchflag(switchdata[i]);
        if ((switchdata[i].Status).length != ""){
        for ( var j = (switchdata[i].Status).length-1; j>=0; j--)
        {
          if ((switchdata[i].Status[j].Trigger=="web")||(switchdata[i].Status[j].Trigger=="manual")){
            var lastupdated = switchdata[i].Status[j].Lastupdated;
            if((currenttime.getHours()-lastupdated.getHours())>1){
              if(switchdata[i].SwitchAutoMode != "true") {
                  Switch.update({UUID: switchdata[i].UUID, SwitchPin: parseInt(switchdata[i].SwitchPin), MACID: switchdata[i].MACID}, 
                  {'SwitchAutoMode':true},{upsert:true}, function(err, data) { 
                  if(err){console.log(err);
                    switchautoflag(i+1, switchdata);
                  }
                  else {
                    switchautoflag(i+1, switchdata);
                  }
                  });
          autoflag.internalautoflag(switchdata.webhook, "false", switchdata.switchpin);
              };
            };
            j=0;
          };
          if (j==0){
            switchautoflag(i+1, switchdata);
          };
        };
        }
        else {
          switchautoflag(i+1, switchdata);
        };
        };
};

//might have to be moved to different modules, because in the night the light switch should be in the non-automatic mode
var cronJob= cron.job("*/5 * * * * *", function(){
      Switch.find({}).exec(function(err, switchdata){
        if (err){console.log(err);}
        else{
        switchautoflag(0, switchdata);
      };
  });

});

cronJob.start();
