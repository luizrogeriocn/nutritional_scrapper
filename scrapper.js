var request = require('request');
var fs = require('fs');

var url_begin = "http://ndb.nal.usda.gov/ndb/foods/show/";
var url_end = "?format=Abridged&reportfmt=csv";

for(var i = 1; i < 8464; i++){
	request(url_begin+i+url_end, function (error, response, body) {
	    if (!error) {
	    	fs.appendFileSync('/home/roger/Documents/scrapper/results.txt', body);
	    	fs.appendFileSync('/home/roger/Documents/scrapper/results.txt', '\n==END==\n');
	    } else {
	        console.log("error retrieving data");
	    }
	});
}