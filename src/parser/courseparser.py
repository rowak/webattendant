# Code made with assistance from Python Software Foundation
# https://docs.python.org/3/library/html.parser.html

# Additional code for reading a Python file line by line was provided by Python Tutorial
# https://www.pythontutorial.net/python-basics/python-read-text-file/

# The way I learned how to catch the missing file error came from Charles Horbrow
# https://stackoverflow.com/questions/5627425/what-is-a-good-way-to-handle-exceptions-when-trying-to-read-a-file-in-python
# It was mainly the IOError line I needed

# Code for the initial parser which will read in the file is done by Nash Rudiak

# Only need HTMLParser from html, so I would rather not reinvent the wheel and just go with
# the command from my research. It is an innate library of Python
from html.parser import HTMLParser

import re

# For future use
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
# 9: A hidden variable
# 10: Academic level


def ParseCourses(name):
	class ParseData(HTMLParser):

		# An explanation of the variables:
		# dataRead : A variable that indicates what kind of data you are reading in.
		#            There is a list above which explains what each entry in the table
		#            should correspond to. -1 indicates to not read
		# store    : A variable which will hold the string that comes from an entry
		# jdata    : A string which can be converted into a JSON data structure once
		#            completed
		def __init__(self):
			super(ParseData, self).__init__()
			self.dataRead = -1
			self.store = ""
			self.storeLines = []
			self.jdata = ""

		# Before I explain, there are 5 important things:
		# An entry starts and ends with <tr>
		# There are several tables
		# The column headers are <th>
		# A tr entry can exist that we do not want to read, and these all have no data within
		#     so it will not call handle_data and thus jdata is empty
		# A data entry starts with a hidden index that will be read by the parser

		# The way the parser works is as follows:
		# It will read line by line and perform the following tasks
		#  1.  Wait until self.dataRead is enabled (not -1)
		#      If it is <tr>, then enable the self.dataRead by setting it to 0
		#      The <th> entry will instantly mean the content is not to be stored, so turn it back to -1
		#           and reset self.store
		#  2.  Read data and store it in self.store
		#      Stop storing once <tr> ends
		#  3.  Once <tr> ends, add self.store to self.jdata
		#      Use the self.dataRead variable to indicate what you are writing
		#      Refer to table above for what each column means
		#  4.  If a new <tr> occurs, then we have a completed entry
		#      If self.dataRead is 0 and there is something in self.jdata, then we can use it
		#      and reset self.jdata
		#  5.  If table occurs, then we need to wrap up
		#      Indicate stop reading by setting self.dataRead to -1
		#      If there is something in self.jdata, then it needs to be finished up

		def handle_starttag(self, tag, attrs):
			if(tag == "tr"):
				if(self.dataRead == -1):
					self.jdata = "{"
				self.dataRead = 0
			elif(tag == "th"):
				self.dataRead = -1
				self.jdata = ""
			elif(tag == "div"):
				# Data will look better if there is spaces between some things
				if(self.store != ""):
					self.store += " "


		def handle_endtag(self, tag):
			if(tag == "td" and self.dataRead != -1):
				if(self.store != ""):
					# Store will need to clean up extra spaces
					self.store = self.store.strip()
					# print (self.store)
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
						# Case for the term (Usually something like "Fall 2022")
						# Type: String
						self.jdata += "\"term\": \"" + self.store + "\", "
					elif self.dataRead == 2:
						# Case for the status
						# Type: String
						self.jdata += "\"status\": \"" + self.store + "\", "
					elif self.dataRead == 3:
						# Case for the code, id, and name. ID will be the section number
						# Type: String, Int, String
						temp = self.store.split(" ", 2)
						temp2 = temp[0].split("*", 2)
						self.jdata += "\"code\": \"" + temp2[0] + "*" + temp2[1] + "\", "
						self.jdata += "\"id\": " + temp2[2] + ", "
						self.jdata += "\"name\": \"" + temp[2] + " " + temp[1] + "\", "
					elif self.dataRead == 4:
						# Case for the location info (Guelph mostly)
						# Type: String
						self.jdata += "\"location\": \"" + self.store + "\", "
					elif self.dataRead == 5:
						# Case for the meeting info
						# Type: CUSTOM
						meetingInfo = ParseData.parse_meeting_info(self, self.storeLines)
						self.jdata += "\"meetings\": " + json.dumps(meetingInfo) + ", "
						# self.jdata += "\"meeting\": \"" + self.store + "\", "
					elif self.dataRead == 6:
						# Case for the professor teaching the course
						# Type: String
						self.jdata += "\"teacher\": \"" + self.store + "\", "
					elif self.dataRead == 7:
						# Case for the capacity and avaialbel capacity
						# Type: Int, Int
						temp = self.store.split("/", 2)
						# print(temp)
						self.jdata += "\"capacity\": " + temp[1] + ", "
						self.jdata += "\"availableCapacity\": " + temp[0] + ", "
					elif self.dataRead == 8:
						# Case for the credits
						# Type: Float
						self.jdata += "\"credits\": \"" + self.store + "\", "
					elif self.dataRead == 10:
						self.jdata += "\"academiclevel\": \"" + self.store + "\""
					elif(self.dataRead != 9):
						self.jdata += "\"error\": " + self.store + "\", "
					# End of stuff to do with the store
				self.dataRead += 1
				self.store = ""
				self.storeLines = []
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
				self.storeLines.append(data)

		def parse_meeting_info(self, meetingLines):
			allMeetingInfo = []

			lineIterator = iter(meetingLines)
			currLine = next(lineIterator)
			while (currLine != None):
				meetingInfo = {}
				roomInfo = {}

				# Parse meetingType
				if currLine.startswith("Distance Education"):
					meetingType = "Distance Education"
				else:
					lineSplit = currLine.split(" ")
					meetingType = lineSplit[0]
				meetingInfo["type"] = meetingType

				# Parse daysOfWeek
				days = currLine.replace(meetingType + " ", "")
				if days == "Days TBA":
					meetingInfo["daysOfWeek"] = None
				else:
					meetingInfo["daysOfWeek"] = days.split(", ")

				# Parse startTime and endTime
				timesLine = next(lineIterator)
				if timesLine != "Times TBA":
					timesSplit = timesLine.split(" - ")
					endTimeSplit = timesSplit[1].split(" ")
					meetingInfo["startTime"] = timesSplit[0]
					meetingInfo["endTime"] = endTimeSplit[0]
				else:
					meetingInfo["startTime"] = None
					meetingInfo["endTime"] = None

				# Parse date (only for exams)
				if meetingType == "EXAM":
					# Special Case: Exam is a one-time event, so it occurs on a specific day
					match = re.search(r'\((\d+/\d+/\d+)\)', timesLine)
					meetingInfo["date"] = match.group(1)
				else:
					meetingInfo["date"] = None

				# Parsing building (stored in roomInfo)
				buildingLine = next(lineIterator)
				if buildingLine != "Room TBA" and buildingLine != "Room VIRTUAL" and buildingLine != "Room GNHS":
					roomInfo["building"] = buildingLine
					currLine = next(lineIterator)
				else:
					roomInfo["building"] = None

				# Parse roomNumber (stored in roomInfo)
				roomLine = currLine
				if buildingLine == "Room TBA" or roomLine == "Room TBA":
					roomInfo["roomNumber"] = "TBA"
				elif buildingLine == "Room VIRTUAL" or roomLine == "Room VIRTUAL":
					roomInfo["roomNumber"] = "VIRTUAL"
				elif buildingLine == "Room GNHS" or roomLine == "Room GNHS":
					roomInfo["roomNumber"] = "GNHS" # No idea what this is
				else:
					roomInfo["roomNumber"] = roomLine.replace(", Room ", "")
				meetingInfo["roomInfo"] = roomInfo

				allMeetingInfo.append(meetingInfo)
				if (currLine != None):
					currLine = next(lineIterator, None)
			
			return allMeetingInfo

	# A small try catch for opening the file and reading line by line
	# It would be too much memory to read all at once, so it will read line
	# by line
	try:
		with open(name, "r") as file:
			parser = ParseData()
			for line in file:
				parser.feed(line.strip())
			parser.close()
	except IOError:
		print("The file could not be opened")

ParseCourses("Section Selection Results WebAdvisor University of Guelph.html")
