var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var Sensordata = require('../models/sensordata');
var Switch = require('../models/switchdata');
var regularlight = require('../controllers/Automation/regularlight');
var nightlamp = require('../controllers/Automation/nightlamp');
var showpiecelamp = require('../controllers/Automation/showpiecelamp');
var tablelamp = require('../controllers/Automation/tablelamp');
var chandelier = require('../controllers/Automation/chandelier');
var airconditioner = require('../controllers/Automation/airconditioner');
//var switchstatus = require('../models/switchstatus');
var currenttime = new Date(); //current date&time at location


exports.postswitchflag = function(switchdata){
		if(switchdata.SwitchType=="regularlight"){//this is where the function can be inserted/change tubelight to regular light
			regularlight.flagregularlight(switchdata);
			}
		else if(switchdata.SwitchType=="nightlamp"){
			nightlamp.flagnightlamp(switchdata);
		}
		else if(switchdata.SwitchType=="showpiecelamp"){
			showpiecelamp.flagshowpiecelamp(switchdata);
		}
		else if(switchdata.SwitchType=="tablelamp"){
			tablelamp.flagtablelamp(switchdata);
		}
		else if(switchdata.SwitchType=="chandelier"){
			chandelier.flagchandelier(switchdata);
		}
		else if(switchdata.SwitchType=="waterheater"){

		}
		else if(switchdata.SwitchType=="ceilingfan"){

		}
		else if(switchdata.SwitchType=="tablefan"){

		}
		else if(switchdata.SwitchType=="airconditioner"){
			airconditioner.flagairconditioner(switchdata);
		}
		else if(switchdata.SwitchType=="roomheater"){

		}
		else if(switchdata.SwitchType=="tv"){

		}
		else if(switchdata.SwitchType=="dvrbox"){

		}
		else if(switchdata.SwitchType=="washingmachine"){

		}
		else if(switchdata.SwitchType=="microwaveoven"){

		}
		else if(switchdata.SwitchType=="refrigerator"){

		}
		else if(switchdata.SwitchType=="cookingrange"){

		}
		else if(switchdata.SwitchType=="toaster"){

		}
		else if(switchdata.SwitchType=="coffeemaker"){

		}
		else if(switchdata.SwitchType=="curtain"){

		}
		else if(switchdata.SwitchType=="computer"){

		}
		else if(switchdata.SwitchType=="plug"){

		}else{
			console.log("Switch Type Not Found!");
			console.log(switchdata);
		}
}

exports.getswitchflag = function(req,res){


}