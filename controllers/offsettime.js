var requestify = require('requestify');
//var req = 'https://maps.googleapis.com/maps/api/timezone/json?location=23.6034810,88.6822510&timestamp=1331161200&key=AIzaSyC9tYV4xbXF-O_Gt79n1kTD-_HVZHOc1L8';

var latitude;
var output;
exports.offsettime = function localtime (req,callback) {
	// body...
	requestify.get(req).then(function(response) {
    response.getBody();
    response.body;
    //console.log(response.body);
    latitude = JSON.parse(response.body);
    output = [latitude.rawOffset,latitude.dstOffset];
    callback(output);
});
};

/*localtime(req,function(data){
	console.log(data);
});
*/