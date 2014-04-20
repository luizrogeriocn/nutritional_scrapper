##A simple data retriever and parser script.
This application aims to get more than eight thousand food's nutritional information from USDA website and parse it to a processable XML file.

##Files

###scrapper.js
- Script to retrieve all the information via HTTP requests and store it.

###results.txt
- File where the retrieved information is stored.

###parse_csv_xml.js
- Script to process results.txt to XML. 
- __Implemented:__ All the information is already parsed to a JSON object.
- __To be implemented:__ Parse the JSON object to XML.

###foods.xml
- XML file containing all the parsed food information.

###old_parser.js
- Old method used to parse results.txt (kept for references).



##Additional info
I created this project for learning purposes only.
