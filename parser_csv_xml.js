var fs = require('fs');
var text = fs.readFileSync('results.txt','utf8');

var attributes = {names: ['Proximates', 'Minerals', 'Vitamins', 'Lipids', 'Other'], regex_pattern: "\n((.*\n\")*(.*\n))"};
var nutri_opt = {names: ['nome', 'unit', 'amount'], regex: ["/\"(.*)\"/g", "/\",([^0-9]*),/g", "/[^0-9],(([0-9]|\.)*),/g"]};

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

var nutrients_to_xml = function(attribute, options){
	var names = options.names;
	var nutri_str = '\n';
	for(var i = 0; i < attribute.length; i++){
		for(var j = 0; j < names.length; j++){
			nutri_str += attribute[i][names[j]]+' ';
		}
		nutri_str += '\n';
	}
	return nutri_str;
};

var attributes_to_xml = function(food, options){
	var names = options.names;
	var attr_str = '';

	for(var i = 0; i < names.length; i++){
		if(food[names[i]]){
			attr_str += '-'+names[i];
			var nutrients = nutrients_to_xml(food[names[i]], nutri_opt);
			attr_str += nutrients;
		}
	}

	return attr_str;
};

var food_to_xml = function(food){
	var food_str = 'begin\n'+'+'+food.nome+'\n';
	var attr_str = attributes_to_xml(food, attributes);
	food_str += attr_str+'end\n';
	return food_str;
};

/*Show me some magic!*/
var result = get_foods(text);
for(var i = 0; i < result.length; i++){
	var xml_element = food_to_xml(result[i]);
	fs.appendFileSync('foods.xml', xml_element);
}
