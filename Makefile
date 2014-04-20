get:
		node scrapper.js

parse:
		node parser_csv_xml.js

clean:
		rm results.txt
		rm foods.xml