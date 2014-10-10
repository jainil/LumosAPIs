// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var sensordataController = require('./controllers/sensordata');
var userController = require('./controllers/useridentity');
var deviceidentitycontroller = require('./controllers/deviceidentity');
var onoffcontroller = require('./controllers/turnon');
var statuscontroller = require('./controllers/switchstatus');
var switchdatacontroller = require('./controllers/switchdata')
var switchflagcontroller = require('./controllers/switchflag');
var powercontroller = require('./controllers/poweranalytics');
var passport = require('passport');
var authController = require('./controllers/auth');
//var authsensor = require('./controllers/authsensor');


// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/LumosDatabase1');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// 1. Create endpoint handlers for user identity management
router.route('/useridentity')
  .post(userController.postuseridentity)
  .get(authController.isAuthenticated, userController.getuseridentity);

// 2.1. Create endpoint handlers to find all rooms for a user
router.route('/roomlist')
  .get(authController.isAuthenticated, deviceidentitycontroller.getroomlist);

// 2.2. Create endpoint handlers for device identity management
router.route('/deviceidentity')
  .post(authController.isAuthenticated, deviceidentitycontroller.postdeviceidentity)
  .get(authController.isAuthenticated, deviceidentitycontroller.getdeviceidentity)
  .delete(authController.isAuthenticated, deviceidentitycontroller.deletedeviceidentityentryid);

// 2.3. Create endpoint handlers to retrieve all switch panels in a particular room
router.route('/roomdevices')
  .get(authController.isAuthenticated, deviceidentitycontroller.getroomwisepanellist);
 // .put(authController.isAuthenticated, deviceidentitycontroller.putdeviceidentityentryid)

//3. Create endpoint to turn on or turn off switches
router.route('/webturnon')
  .post(authController.isAuthenticated, onoffcontroller.webpostturnon);
  //.get(authController.isAuthenticated, onoffcontroller.getturnon);

//4. Create endpoint to communicate status of every single switch
router.route('/status')
  .post(authController.isAuthenticated, statuscontroller.postswitchstatus)
  .get(authController.isAuthenticated, statuscontroller.getswitchstatus)
  .delete(authController.isAuthenticated, statuscontroller.deleteswitchstatus);


/*/5. Create endpoint to communicate status of every single switch
router.route('/autoflag')
  .post(authController.isAuthenticated, switchautoflagcontroller.postswitchautoflag)
  .get(authController.isAuthenticated, switchautoflagcontroller.getswitchautoflag);*/

//6. Create endpoint to store details of every single switch
router.route('/switchdata')
  .post(authController.isAuthenticated, switchdatacontroller.postswitchdata)
  .get(authController.isAuthenticated, switchdatacontroller.getswitchdata);

//4.1 Create endpoint to retrive all switches for a switchpanel
router.route('/switchlist')
  .get(authController.isAuthenticated, switchdatacontroller.getswitchlist);

/*/7. Create endpoint to communicate flag status which decides what to do with every switch
router.route('/statusflag') //motionflag
  .post(authController.isAuthenticated, switchflagcontroller.postswitchflag)
  .get(authController.isAuthenticated, switchflagcontroller.getswitchflag);*/

//8. Create endpoint handlers to post sensor data for a switch
router.route('/sensordata')
  .post(authController.isAuthenticated, sensordataController.postsensordata)
  .get(authController.isAuthenticated, sensordataController.getsensordata);

//8.1. Create endpoint handlers to retrieve a particular sensordata
router.route('/sensordata/:sensordataentryid')
  .get(authController.isAuthenticated, sensordataController.getsensordataentryid)
 // .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, sensordataController.deletesensordataentryid);

//9. Create endpoint to communicate poweranalytics of every single switch
router.route('/poweranalytics')
  .get(authController.isAuthenticated, powercontroller.currentdata);
/*
//10. Create endpoint to communicate change of temperature to a.c or fan swtiches
router.route('/changetemp')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

//11. Create endpoint to communicate change in fan speed for every switch
router.route('/changefanspeed')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

//12. Create endpoint to handle notification shanges if any
router.route('/notification')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);
*/
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);