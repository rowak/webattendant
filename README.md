# CIS3760

## React/Flask App

### Running the app in development mode
TODO

### Installing the app
You may need to install make using `sudo apt install make` before continuing.

```
make install
```

### Deploying the app
The following command deploys the app to the /app directory on the system.
```
make deploy
```

The flask server is run as a daemon on port 5000, and the react app runs on port 3000.

## CourseLoader Spreadsheet

The spreadsheet can be found in the root directory as CourseLoader.xlsm.  

It is a macro enabled spreedsheet that enables a user to type in five courses as well as their section code and it will plot a timetable using data parsed in Sprint 1.  

### Running
When opening the spreadsheet, macros may have been disabled by your operating system. Macros must be enabled in order for the sheet to work as intended.  

To run, simply type the course code e.g. CIS\*3760 (this can be with or without the asterisk '\*') in column H. Followed by the section code e.g. 0101 in column I.  

Up to 5 courses can be plotted and the user will be notified by an alert if there are any scheduling conflicts. Addtionally, conflicting timeslots will appear grey on the schedule.

### Source Code
All source code is written using Visual Basic for Applications, this allows the program to be interactive using macros. Addtionally, this program works on both MacOS and Windows versions of Excel. We've achieved cross-platform capability by avoiding Windows exclusive features such as ActiveX VB elements.  

To view the source code you can right click on the "Schedule" sheet in the bottom left corner. All necessary attributions are listed in comments above subroutines. 

Any further info on CourseLoader will be documented in this repository's wiki.

## Testing
Unit tests can be run using  `make test`. Tests are also run automatically when you push your code to GitLab.

## Courseparser.py

### Running
`./courseparser.sh <inputfile> <outputfile>`

### Design
A function which will open a file given to it and attempt to read the courses. Each course is expected to be in a table and have table entries in the following order:
- A index
- A Term
- A Status
- A name in the format of [Short version of a course name]*[Course code]*[Section number] ([Number]) [Name]. For example: ACC*1259*0101 (6749) Accounting Test Course
- A location 
- A description of the meeting location
- A teacher name
- A capacity and available capacity in the format x / y where x = available and y = total capacity
- A credit number
- A hidden entry which does not have any information
- The academic level
You must either fill them out in the format provided or leave the entry completely blank, otherwise the function will not be able to parse. A sample document provided by the professor has these automatically generated.
Most of the inital parser work was done by Nash Rudiak.
Code made with assistance from Python Software Foundation, using the documentation for the built in html.parser library
https://docs.python.org/3/library/html.parser.html

Additional code for reading a Python file line by line was provided by Python Tutorial
https://www.pythontutorial.net/python-basics/python-read-text-file/

Charles Horbrow on Stack Overflow provided a way to do a try-catch block without the file error getting in the way of other errors (for debugging purposes)
https://stackoverflow.com/questions/5627425/what-is-a-good-way-to-handle-exceptions-when-trying-to-read-a-file-in-python
