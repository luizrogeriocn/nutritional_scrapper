var fs = require('fs');
var text = fs.readFileSync('results.txt','utf8');

var get_attributes = function(food, n){
	var reg_exps = [];
	reg_exps.push(/"Nutrient data for:\s\s\d{5},(.*)"/g);
	reg_exps.push(/Proximates\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Minerals\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Vitamins\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Lipids\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Other\n((.*\n")*(.*\n))/g);

	var m = reg_exps[n].exec(food);
    if (m)
    	return(m[1]);
};

var get_values = function(param){
	var re = /[^0-9],(([0-9]|\.)*),/g;
	var s = param;
	var m;
	var values = [];

	do {
		m = re.exec(s);
		if(m){
			values.push(m[1]);
		}
	} while(m);
	return values;
};

var get_units = function(param){
	var re = /",([^0-9]*),/g;
	var s = param;
	var m;
	var units = [];

	do {
		m = re.exec(s);
		if(m){
			units.push(m[1]);
		}
	} while(m);
	return units;
};

var get_names = function(param){
	var re = /"(.*)"/g;
	var s = param;
	var m;
	var names = [];

	do {
		m = re.exec(s);
		if(m){
			names.push(m[1]);
		}
	} while(m);
	return names;
};

var get_foods = function(param){
	var re = /Basic\sReport\n((.|\n(?!==END==))*)/g;
	var s = param;
	var cont = 0;
	var m;
	var foods = [];

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++;
	    	var food = {};
	    	food.nome = get_attributes(m[1], 0);
	    	food.proximates = get_attributes(m[1], 1);
	    	food.minerals = get_attributes(m[1], 2);
	    	food.vitamins = get_attributes(m[1], 3);
	    	food.lipids = get_attributes(m[1], 4);
	    	food.other = get_attributes(m[1], 5);
	    	foods.push(food);
	        console.log("Getting food #"+cont);
	    }
	} while (m);
	return foods;
};

var result = get_foods(text);
console.log(result[321]);
var names = get_names(result[321].proximates);
console.log(names);
var units = get_units(result[321].proximates);
console.log(units);
var values = get_values(result[321].proximates);
console.log(values);