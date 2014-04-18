http = require('http');
var fs = require('fs');

var url_begin = "http://ndb.nal.usda.gov/ndb/foods/show/";
var url_end = "?format=Abridged&reportfmt=csv";

for(var i = 1; i <= 8463; i++){
	http.get(url_begin+i+url_end, function(res) {
	  res.on('data', function (chunk) {
	      fs.appendFile('/home/roger/Documents/scrapper/result.txt', chunk, function (err) {
	        if (err) throw err;
	        console.log('The "data to append" was appended to file!');
	      });
	    });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
}