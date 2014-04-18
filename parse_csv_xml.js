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
var proximates_not_found = 0;
var minerals_not_found = 0;

var getFoods = function(textParam){
	var re = /Basic\sReport\n((.|\n(?!==END==))*)/g;
	var s = textParam;
	var cont = 0;
	var m;

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++;
	    	var food = {};
	    	food.name = getName(m[1]);
	    	food.proximates = getProximates(m[1]);
	    	foods.push(food);
	        console.log("Getting food #"+cont);
	    }
	} while (m);
};

var getName = function(param){
	var re = /"Nutrient data for:\s\s\d{5},(.*)"/g;

    var m = re.exec(param);
    if (m)
    	return(m[1]);
    console.log("ERROR - NO NAME FOUND");
};

var getProximates = function(param){
	var re = /Proximates\n((.*\n")*(.*\n))/g;

	var m = re.exec(param);
    if (m)
    	return(m[1]);
    console.log("ERROR - NO PROXIMATE FOUND");
    proximates_not_found++;
};

var getMinerals = function(param){
	var re = /Minerals\n((.*\n")*(.*\n))/g;

	var m = re.exec(param);
    if (m)
    	return(m[1]);
    console.log("ERROR - NO MINERAL FOUND");
    minerals_not_found++;
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
};

getFoods(text);
/*getNames(foods);
getProximates(foods);
getMinerals(foods);
getVitamins(foods);
getLipids(foods);
getOthers(foods);*/
console.log("--------------------------------------------");
console.log("Foods obtained: "+foods.length);
console.log(foods[3000]);
/*console.log("Names obtained: "+names.length);
console.log("Proximates obtained: "+proximates.length);
console.log("Minerals obtained: "+minerals.length);
console.log("Vitamins obtained: "+vitamins.length);
console.log("Lipids obtained: "+lipids.length);
console.log("Others obtained: "+others.length);*/
console.log(nf);

