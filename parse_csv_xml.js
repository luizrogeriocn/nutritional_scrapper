var fs = require('fs');

var text = fs.readFileSync('/home/roger/Documents/scrapper/res_test','utf8');
var names = [];
var proximates = [];
var minerals = [];
var foods = [];

var getFoods = function(){
	var re = /EDT\n((.|\n(?!Source))*)/g;
	var s = text
	var cont = 0;
	var m;

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++
	    	foods.push(m[1]);
	        console.log("Getting #"+cont);
	    }
	} while (m);
	console.log("Foods obtained: "+foods.length);
}

var getName = function(foodsParam){
	var re = /"Nutrient data for:\s\s\d{5},(.*)"/g;
	var s = foodsParam;
	var cont = 0;
	var m;
	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++
		    	names.push(m[1]);
		        console.log("Getting #"+cont);
		    }
		} while (m);
		console.log("Names obtained: "+names.length);
	}
};

var getNames = function(){
	var re = /"Nutrient data for:\s\s\d{5},(.*)"/g;
	var s = text
	var cont = 0;
	var m;

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++
	    	names.push(m[1]);
	        console.log("Getting #"+cont);
	    }
	} while (m);
	console.log("Names obtained: "+names.length);
};

var getProximates = function(){
	var re = /Proximates\n((.*\n)*)Minerals/g;
	var s = text
	var cont = 0;
	var m;

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++
	    	proximates.push(m[1]);
	        console.log("Getting proximate #"+cont);
	    }
	} while (m);
	console.log("Proximates obtained: "+proximates.length);
};

getFoods();
//console.log(foods);
getName(foods);
console.log(names);

