##A simple data retriever and parser script.
This application aims to get more than eight thousand food's nutritional information from USDA website and parse it to a processable XML file.


##Files

###Makefile
- __get:__ Runs the scrapper script (may take several minutes to retrieve all data).
- __parse:__ Parses results.txt to foods.xml (not real XML markup yet).
- __clean:__ Deletes results.txt and food.xml files.

####scrapper.js
- Script to retrieve all data via HTTP requests and store it in results.txt.

####results.txt
- Stores retrieved data.

####parse_csv_xml.js
- Script to process results.txt to XML. 

####foods.xml
- XML file containing all the parsed food information.

####old_parser.js
- Old method used to parse results.txt (kept for references).


----
###Additional info
I created this project for learning purposes only.
