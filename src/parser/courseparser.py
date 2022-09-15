# Code made with assistance from Python Software Foundation
# https://docs.python.org/3/library/html.parser.html

# Additional code for reading a Python file line by line was provided by Python Tutorial
# https://www.pythontutorial.net/python-basics/python-read-text-file/

from html.parser import HTMLParser
import json

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
		def __init__(self):
			super(ParseData, self).__init__()
			self.dataRead = -1
			self.store = ""
			self.jdata = ""

		def handle_starttag(self, tag, attrs):
			if(tag != "div" and tag != "label" and tag != "input"):
				if(tag == "tr"):
					if(self.dataRead == -1):
						self.jdata = "{"
					self.dataRead = 0
				elif(tag == "th"):
					self.dataRead = -1
					self.jdata = ""


		def handle_endtag(self, tag):
			if(tag != "div" and tag != "label" and tag != "input"):
				if(tag == "td" and self.dataRead != -1 and self.store != ""):
					if self.dataRead == 0:
						# 0 is unique as it usually is a hidden index value.
						# However, it will only be 0 if it is the first entry.
						# In other words, we are done reading the previous jdata
						if(self.jdata != "" and self.jdata != "{"):
							self.jdata += "}"
							# At this point, jdata can be converted to a JSON object and treated as
							# done and ready to be stored.
							print(self.jdata)
							self.jdata = "{"
					elif self.dataRead == 1:
						self.jdata += "\"term\": \"" + self.store + "\", "
					elif self.dataRead == 2:
						self.jdata += "\"status\": \"" + self.store + "\", "
					elif self.dataRead == 3:
						temp = self.store.split(" ", 2)
						self.jdata += "\"code\": \"" + temp[0] + "\", "
						self.jdata += "\"section\": \"" + temp[1] + "\", "
						self.jdata += "\"name\": \"" + temp[2] + "\", "
					elif self.dataRead == 4:
						self.jdata += "\"location\": \"" + self.store + "\", "
					elif self.dataRead == 5:
						self.jdata += "\"meeting\": \"" + self.store + "\", "
					elif self.dataRead == 6:
						self.jdata += "\"teacher\": \"" + self.store + "\", "
					elif self.dataRead == 7:
						self.jdata += "\"available\": \"" + self.store + "\", "
					elif self.dataRead == 8:
						self.jdata += "\"credits\": \"" + self.store + "\", "
					elif self.dataRead == 9:
						self.jdata += "\"academiclevel\": \"" + self.store + "\""
					else:
						self.jdata += "\"error\": " + self.store + "\", "
					# End of stuff to do with the store
					self.dataRead += 1
					self.store = ""
				elif(tag == "table"):
					if(self.dataRead != -1):
						# Before the -1 indicating end, make sure to add final entry
						if(self.jdata != "" and self.jdata != "{"):
							self.jdata += "}"
							print(self.jdata)
							self.jdata = ""
					self.dataRead = -1

		def handle_data(self, data):
			if(self.dataRead != -1):
				self.store += data

	with open(name, "r") as file:
		parser = ParseData()
		for line in file:
			parser.feed(line.strip())
		parser.close()

ParseCourses("Section Selection Results WebAdvisor University of Guelph.html")
