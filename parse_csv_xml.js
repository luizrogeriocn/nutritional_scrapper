var fs = require('fs');

var text = fs.readFileSync('/home/roger/Documents/scrapper/results.txt','utf8');
var foods = [];
var proximates_not_found = 0;
var minerals_not_found = 0;
var vitamins_not_found = 0;
var lipids_not_found = 0;
var others_not_found = 0;

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
	    	food.minerals = getMinerals(m[1]);
	    	food.vitamins = getVitamins(m[1]);
	    	food.lipids = getLipids(m[1]);
	    	food.other = getOthers(m[1]);
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

var getVitamins = function(param){
	var re = /Vitamins\n((.*\n")*(.*\n))/g;

	var m = re.exec(param);
    if (m)
    	return(m[1]);
    console.log("ERROR - NO VITAMIN FOUND");
    vitamins_not_found++;
};

var getLipids = function(param){
	var re = /Lipids\n((.*\n")*(.*\n))/g;

	var m = re.exec(param);
    if (m)
    	return(m[1]);
    console.log("ERROR - NO LIPID FOUND");
    lipids_not_found++;
};

var getOthers = function(param){
	var re = /Other\n((.*\n")*(.*\n))/g;

	var m = re.exec(param);
    if (m)
    	return(m[1]);
    console.log("ERROR - NO OTHER FOUND");
    others_not_found++;
};

getFoods(text);
console.log("--------------------------------------------");
console.log("Foods obtained: "+foods.length);
console.log(foods[8117]);
console.log(proximates_not_found);
console.log(minerals_not_found);
console.log(vitamins_not_found);
console.log(lipids_not_found);
console.log(others_not_found);

