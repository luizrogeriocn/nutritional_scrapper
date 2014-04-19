var fs = require('fs');
var text = fs.readFileSync('/home/roger/Documents/scrapper/results.txt','utf8');

var getAttributes = function(food, n){
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

var getFoods = function(textParam){
	var re = /Basic\sReport\n((.|\n(?!==END==))*)/g;
	var s = textParam;
	var cont = 0;
	var m;
	var foods = [];

	do {
	    m = re.exec(s);
	    if (m) {
	    	cont++;
	    	var food = {};
	    	food.nome = getAttributes(m[1], 0);
	    	food.proximates = getAttributes(m[1], 1);
	    	food.minerals = getAttributes(m[1], 2);
	    	food.vitamins = getAttributes(m[1], 3);
	    	food.lipids = getAttributes(m[1], 4);
	    	food.other = getAttributes(m[1], 5);
	    	foods.push(food);
	        console.log("Getting food #"+cont);
	    }
	} while (m);
	return foods;
};

var result = getFoods(text);