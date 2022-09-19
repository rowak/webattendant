# CIS3760

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
