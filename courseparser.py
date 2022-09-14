# Code made with assistance from Python Software Foundation
# https://docs.python.org/3/library/html.parser.html

# Additional code for reading a Python file line by line was provided by Python Tutorial
# https://www.pythontutorial.net/python-basics/python-read-text-file/

from html.parser import HTMLParser
import json

global dataRead
dataRead = -1
global store
store = ""
global jdata
jdata = ""

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
			global jdata
			if(tag != "div" and tag != "label" and tag != "input"):
				if(tag == "tr"):
					if(dataRead == -1):
						jdata = "{"
					dataRead = 0
				elif(tag == "th"):
					dataRead = -1
					jdata = ""


		def handle_endtag(self, tag):
			global dataRead
			global store
			global jdata
			if(tag != "div" and tag != "label" and tag != "input"):
				if(tag == "td" and dataRead != -1 and store != ""):
					match dataRead:
						case 0:
							# 0 is unique as it usually is a hidden index value.
							# However, it will only be 0 if it is the first entry.
							# In other words, we are done reading the previous jdata
							if(jdata != "" and jdata != "{"):
								jdata += "}"
								# At this point, jdata can be converted to a JSON object and treated as
								# done and ready to be stored.
								print(jdata)
								jdata = "{"
						case 1:
							jdata += "\"term\": \"" + store + "\", "
						case 2:
							jdata += "\"status\": \"" + store + "\", "
						case 3:
							temp = store.split(" ", 2)
							jdata += "\"code\": \"" + temp[0] + "\", "
							jdata += "\"section\": \"" + temp[1] + "\", "
							jdata += "\"name\": \"" + temp[2] + "\", "
						case 4:
							jdata += "\"location\": \"" + store + "\", "
						case 5:
							jdata += "\"meeting\": \"" + store + "\", "
						case 6:
							jdata += "\"teacher\": \"" + store + "\", "
						case 7:
							jdata += "\"available\": \"" + store + "\", "
						case 8:
							jdata += "\"credits\": \"" + store + "\", "
						case 9:
							jdata += "\"academiclevel\": \"" + store + "\""
						case _:
							jdata += "\"error\": " + store + "\", "
					# End of stuff to do with the store
					dataRead += 1
					store = ""
				elif(tag == "table"):
					if(dataRead != -1):
						# Before the -1 indicating end, make sure to add final entry
						if(jdata != "" and jdata != "{"):
							jdata += "}"
							print(jdata)
							jdata = ""
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
