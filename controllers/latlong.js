var requestify = require('requestify');
var longitude;
var latitude=[];

exports.findlatlong = function latlong (req, callback){
//    if (err){callback(err)};
    var lat, lng;
	requestify.get(req).then(function(response) {
    response.getBody();
    response.body;
    //console.log(response.body);
    latitude = JSON.parse(response.body);
    results = latitude.results;
    //console.log(results);
    for (var i=0; i<results.length; i++){
    lat = results[i].geometry.location.lat;
    lng = results[i].geometry.location.lng;
    //console.log(results[i].geometry.location.lat);
    //console.log(results[i].geometry.location.lng);
    //console.log([lat,lng]);
}
    var output = [lat,lng]
    //console.log(output);
    callback(output);
});
};