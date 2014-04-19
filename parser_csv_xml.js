var fs = require('fs');
var text = fs.readFileSync('results.txt','utf8');

var attributes = {names: ['Proximates', 'Minerals', 'Vitamins', 'Lipids', 'Other'], regex_pattern: "\n((.*\n\")*(.*\n))"};

var get_nome = function(param){
	var reg_exp = /"Nutrient data for:\s\s\d{5},(.*)"/g;
	var m = reg_exp.exec(param);
    if (m)
    	return m[1];
};

var get_each_nutrient = function(param, n){
	var reg_exps = [];
	reg_exps.push(/"(.*)"/g);
	reg_exps.push(/",([^0-9]*),/g);
	reg_exps.push(/[^0-9],(([0-9]|\.)*),/g);

	var results = [];

	do {
		m = reg_exps[n].exec(param);
		if(m){
			results.push(m[1]);
		}
	} while(m);
	return results;
};

var get_nutrients = function(param){
	var nomes = get_each_nutrient(param, 0);
	var units = get_each_nutrient(param, 1);
	var amounts = get_each_nutrient(param, 2);
	var nutrients = [];

	for(var i = 0; i < nomes.length; i++){
		var nutrient = {};
		nutrient.nome = nomes[i];
		nutrient.unit = units[i];
		nutrient.amount = amounts[i];
		nutrients.push(nutrient);
	}
	return nutrients;
};

var get_attributes = function(foodParam){
	var names = attributes.names;
	var regex_pattern = attributes.regex_pattern;

	var food = {};
	food.nome = get_nome(foodParam);

	for(var i = 0; i < attributes.names.length; i++){
		var regex = new RegExp(names[i]+regex_pattern,"g");
		var m = regex.exec(foodParam);
		if(m){
			food[names[i]] = get_nutrients(m[1]);
		}
	}
	return food;
};

var get_foods = function(param){
	var re = /Basic\sReport\n((.|\n(?!==END==))*)/g;
	var s = param;
	var m;
	var foods = [];

	do {
	    m = re.exec(s);
	    if (m) {
	    	var food = {};
	    	food = get_attributes(m[1]);
	    	foods.push(food);
	    }
	} while (m);
	return foods;
};

var result = get_foods(text);