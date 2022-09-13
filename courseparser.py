# Code made with assistance from Python Software Foundation
# https://docs.python.org/3/library/html.parser.html

# Additional code for reading a Python file line by line was provided by Python Tutorial
# https://www.pythontutorial.net/python-basics/python-read-text-file/

from html.parser import HTMLParser

global dataRead
dataRead = -1
global store
store = ""

# For reading files, dataRead will indicate what section is being read
# 0: Index
# 1: Term
# 2: Status (Open/Close)
# 3: Section name and title
# 4: Location
# 5: Meeting Information
# 6: Faculty (Teacher)
# 7: Available/Capacity
# 8: Credits
# 9: Academic level

def ParseCourses(name):
	class ParseData(HTMLParser):
		def handle_starttag(self, tag, attrs):
			global dataRead
			if(tag != "div" and tag != "label" and tag != "input"):
				if(tag == "tr"):
					dataRead = 0
				elif(tag == "th"):
					dataRead = -1


		def handle_endtag(self, tag):
			global dataRead
			global store
			if(tag != "div" and tag != "label" and tag != "input"):
				if(tag == "td" and dataRead != -1 and store != ""):
					if(dataRead == 0):
						# This line will recognize if this is a new entry that needs to be created
						# If needed, work to create a new object to enter in should be done here
						print("New Entry")
						# After this, it will be the general case

					# You have got the data for "store", now use it to store it into the correct position
					# using the dataRead variable
					print("#", dataRead, " ", store)
					# End of stuff to do with the store
					dataRead += 1
					store = ""
				elif(tag == "table"):
					if(dataRead != -1):
						# Before the -1, make sure to add final entry
						print("Done")
						# Do not edit after this, as this if block makes sure it doesn't try to repeat each
						# end of a table code
					dataRead = -1

		def handle_data(self, data):
			global dataRead
			global store
			if(dataRead != -1):
				store += data

	with open(name, "r") as file:
		parser = ParseData()
		for line in file:
			parser.feed(line.strip())
		parser.close()

ParseCourses("Section Selection Results WebAdvisor University of Guelph.html")
