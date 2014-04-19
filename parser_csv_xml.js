var fs = require('fs');
var text = fs.readFileSync('results.txt','utf8');

var get_nome = function(param){
	var reg_exp = /"Nutrient data for:\s\s\d{5},(.*)"/g;
	var m = reg_exp.exec(param);
    if (m)
    	return m[1];
}

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
} 

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

var get_attributes = function(food, n){
	var reg_exps = [];
	reg_exps.push(/Proximates\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Minerals\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Vitamins\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Lipids\n((.*\n")*(.*\n))/g);
	reg_exps.push(/Other\n((.*\n")*(.*\n))/g);

	var m = reg_exps[n].exec(food);
    if (m)
    	return(get_nutrients(m[1]));
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
	    	food.nome = get_nome(m[1]);
	    	food.proximates = get_attributes(m[1], 0);
	    	food.minerals = get_attributes(m[1], 1);
	    	food.vitamins = get_attributes(m[1], 2);
	    	food.lipids = get_attributes(m[1], 3);
	    	food.other = get_attributes(m[1], 4);
	    	foods.push(food);
	        //console.log("Getting food #"+cont);
	    }
	} while (m);
	return foods;
};

var result = get_foods(text);
//console.log(result[7665]);