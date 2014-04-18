var fs = require('fs');

var text = fs.readFileSync('/home/roger/Documents/scrapper/results.txt','utf8');
var names = [];
var proximates = [];
var minerals = [];
var vitamins = [];
var lipids = [];
var others = [];
var foods = [];
var name = [];
var foodCount = 0;

var getFoods = function(textParam){
	var re = /Basic\sReport\n((.|\n(?!==END==))*)/g;
	var s = textParam;
	var cont = 0;
	var m;

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++;
	    	foods.push(m[1]);
	        console.log("Getting food #"+cont);
	    }
	} while (m);
	//console.log("Foods obtained: "+foods.length);
}

var getNames = function(foodsParam){
	var re = /"Nutrient data for:\s\s\d{5},(.*)"/g;
	var s = foodsParam;
	var cont = 0;
	var m;
	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++;
		    	names.push(m[1]);
		        console.log("Getting name #"+cont);
		    }
		} while (m);
	}
	//console.log("Names obtained: "+names.length);
};

var getProximates = function(foodsParam){
	var re = /Proximates\n((.*\n)*)Minerals/g;
	var s = foodsParam;
	var cont = 0;
	var m;

	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++;
		    	proximates.push(m[1]);
		        console.log("Getting proximate #"+cont);
		    }
		} while (m);
	}
	//console.log("Proximates obtained: "+proximates.length);
};

var getMinerals = function(foodsParam){
	var re = /Minerals\n((.*\n)*)Vitamins/g;
	var s = foodsParam;
	var cont = 0;
	var m;

	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++;
		    	minerals.push(m[1]);
		        console.log("Getting mineral #"+cont);
		    }
		} while (m);
	}
	//console.log("Minerals obtained: "+minerals.length);
};

var getVitamins = function(foodsParam){
	var re = /Vitamins\n((.*\n)*)Lipids/g;
	var s = foodsParam;
	var cont = 0;
	var m;

	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++;
		    	vitamins.push(m[1]);
		        console.log("Getting vitamin #"+cont);
		    }
		} while (m);
	}
	//console.log("Vitamins obtained: "+vitamins.length);
};

var getLipids = function(foodsParam){
	var re = /Lipids\n((.*\n)*)Other/g;
	var s = foodsParam;
	var cont = 0;
	var m;

	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++;
		    	lipids.push(m[1]);
		        console.log("Getting lipid #"+cont);
		    }
		} while (m);
	}
	//console.log("Lipids obtained: "+lipids.length);
};

var getOthers = function(foodsParam){
	var re = /Other\n((.|\n(?!Source))*)/g;
	var s = foodsParam;
	var cont = 0;
	var m;

	for(var i = 0; i < foodsParam.length; i++){
		do {
		    m = re.exec(s[i]);
		    if (m) {
		    	cont++;
		    	others.push(m[1]);
		        console.log("Getting others #"+cont);
		    }
		} while (m);
	}
	//console.log("Others obtained: "+others.length);
};

getFoods(text);
getNames(foods);
getProximates(foods);
getMinerals(foods);
getVitamins(foods);
getLipids(foods);
getOthers(foods);
console.log("--------------------------------------------");
console.log("Foods obtained: "+foods.length);
console.log("Names obtained: "+names.length);
console.log("Proximates obtained: "+proximates.length);
console.log("Minerals obtained: "+minerals.length);
console.log("Vitamins obtained: "+vitamins.length);
console.log("Lipids obtained: "+lipids.length);
console.log("Others obtained: "+others.length);