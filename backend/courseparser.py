"""This is a program for parsing course data from the University of Guelph
    course list (HTML) into JSON format."""

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

import sys
import re

# For future use
import json

# For reading files, data_read will indicate what section is being read
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

class ParseData(HTMLParser):
    '''
    This class parses the input HTML course list into JSON.
    '''
    # An explanation of the variables:
    # data_read : A variable that indicates what kind of data you are reading in.
    #            There is a list above which explains what each entry in the table
    #            should correspond to. -1 indicates to not read
    # store    : A variable which will hold the string that comes from an entry
    # jdata    : A string which can be converted into a JSON data structure once
    #            completed
    def __init__(self):
        super().__init__()
        self.data_read = -1
        self.store = ""
        self.store_lines = []  # Contains the same data as "store", but in an array
        self.jdata = {}
        self.courses_array = []
        self.course = {"code": "", "sections": []}
        self.curr_course_code = ""

    # Before I explain, there are 5 important things:
    # An entry starts and ends with <tr>
    # There are several tables
    # The column headers are <th>
    # A tr entry can exist that we do not want to read, and these all have no data within
    #     so it will not call handle_data and thus jdata is empty
    # A data entry starts with a hidden index that will be read by the parser

    # The way the parser works is as follows:
    # It will read line by line and perform the following tasks
    #  1.  Wait until self.data_read is enabled (not -1)
    #      If it is <tr>, then enable the self.data_read by setting it to 0
    #      The <th> entry will instantly mean the content is not to be stored, so turn it back to -1
    #           and reset self.store
    #  2.  Read data and store it in self.store
    #      Stop storing once <tr> ends
    #  3.  Once <tr> ends, add self.store to self.jdata
    #      Use the self.data_read variable to indicate what you are writing
    #      Refer to table above for what each column means
    #  4.  If a new <tr> occurs, then we have a completed entry
    #      If self.data_read is 0 and there is something in self.jdata, then we can use it
    #      and reset self.jdata
    #  5.  If table occurs, then we need to wrap up
    #      Indicate stop reading by setting self.data_read to -1
    #      If there is something in self.jdata, then it needs to be finished up

    def handle_starttag(self, tag, attrs):
        '''
        Function for handling each starting tag
        '''
        if tag == "tr":
            if self.data_read == -1:
                self.jdata = {}
            self.data_read = 0
        elif tag == "th":
            self.data_read = -1
            self.jdata = {}
        elif tag == "div":
            # Data will look better if there is spaces between some things
            if self.store != "":
                self.store += " "

    def handle_endtag(self, tag):
        '''
        Function for handling all ending tags
        '''
        if tag == "td" and self.data_read != -1:
            if self.store != "":
                ParseData.various_end_case(self)
            self.data_read += 1
            self.store = ""
            self.store_lines = []
        elif tag == "table":
            if self.data_read != -1:
                # Before the -1 indicating end, make sure to add final entry
                if len(self.jdata) != 0:
                    self.course["sections"] = [self.jdata.copy()]
                    self.course["code"] = self.curr_course_code
                    self.courses_array.append(self.course.copy())
                    self.jdata = {}
            self.data_read = -1

    def various_end_case(self):
        '''
        Acts as a makeshift switch statement
        '''
        # Store will need to clean up extra spaces
        self.store = self.store.strip()
        if self.data_read == 0:
            # 0 is unique as it usually is a hidden index value.
            # However, it will only be 0 if it is the first entry.
            # In other words, we are done reading the previous jdata
            if len(self.jdata) != 0:
                # At this point, jdata can be converted to a JSON object and treated as
                # done and ready to be stored.
                ParseData.handle_0_case(self)
        elif self.data_read == 1:
            # Case for the term (Usually something like "Fall 2022")
            # Type: String
            self.jdata["term"] = self.store
        elif self.data_read == 2:
            # Case for the status
            # Type: String
            self.jdata["status"] = self.store
        elif self.data_read == 3:
            # Case for the code, id, and name. ID will be the section number
            # Type: String, Int, String
            ParseData.handle_3_case(self)
        elif self.data_read == 4:
            # Case for the location info (Guelph mostly)
            # Type: String
            self.jdata["location"] = self.store
        elif self.data_read == 5:
            # Case for the meeting info
            # Type: CUSTOM
            meeting_info = ParseData.parse_meeting_info(self, self.store_lines)
            self.jdata["meetings"] = meeting_info
        elif self.data_read == 6:
            # Case for the professor teaching the course
            # Type: String
            teachers = self.store.split(", ")
            self.jdata["teachers"] = teachers
        elif self.data_read == 7:
            # Case for the capacity and avaialbel capacity
            # Type: Int, Int
            temp = self.store.split("/", 2)
            self.jdata["availableCapacity"] = int(temp[0])
            self.jdata["capacity"] = int(temp[1])
        elif self.data_read == 8:
            # Case for the credits
            # Type: Float
            self.jdata["credits"] = float(self.store)
        elif self.data_read == 10:
            self.jdata["academicLevel"] = self.store
        elif self.data_read != 9:
            error = {"error": self.store}
            self.jdata["errors"].append(error)
        # End of stuff to do with the store

    def handle_0_case(self):
        '''
        Method for handling the 0 or first case
        '''
        if self.course["code"] == self.curr_course_code \
                        or self.course["code"] == "":
            # Add the current section to the course
            self.course["code"] = self.curr_course_code
            self.course["sections"].append(self.jdata.copy())
        else:
            # Flush the current course because a new course was detected
            self.courses_array.append(self.course.copy())
            self.course["sections"] = [self.jdata.copy()]
            self.course["code"] = self.curr_course_code
        self.jdata = {}

    def handle_3_case(self):
        '''
        Method for handling the 0 case
        '''
        course_info = self.store.split(" ")
        course_and_section_code = course_info[0].split("*")
        course_code = course_and_section_code[0] + "*" + course_and_section_code[1]
        section_code = course_and_section_code[2]
        section_id = course_info[1].replace("(", "").replace(")", "")
        course_name = " ".join(course_info[2:len(course_info)])
        self.jdata["code"] = section_code
        self.jdata["id"] = section_id
        self.jdata["name"] = course_name
        self.curr_course_code = course_code

    def handle_data(self, data):
        '''
        A small function to handle the data for each tag if the read
        variable is set
        '''
        if self.data_read != -1:
            self.store += data
            self.store_lines.append(data)

    def parse_meeting_info(self, meeting_lines):
        '''
        Parses the HTML meeting information and converts it into a dictionary representing
        a meeting_info object

        meeting_lines -- an array with each element representing the inner text of a <div>
                         from the meeting information of the HTML document
        '''
        all_meeting_info = []

        line_iterator = iter(meeting_lines)
        curr_line = next(line_iterator)
        while curr_line is not None:
            meeting_info = {}
            room_info = {}

            # Parse meeting_type
            ParseData.perform_meeting_type(self, curr_line, meeting_info)

            # Parse startTime and endTime
            times_line = ParseData.parse_times(self, line_iterator, meeting_info)

            # Parse date (only for exams)
            if meeting_info["type"] == "EXAM":
                # Special Case: Exam is a one-time event, so it occurs on a specific day
                match = re.search(r'\((\d+/\d+/\d+)\)', times_line)
                meeting_info["date"] = match.group(1)
            else:
                meeting_info["date"] = None

            # Parsing building (stored in roomInfo)
            building_line = next(line_iterator)
            if building_line not in ["Room TBA", "Room VIRTUAL", "Room GNHS"] and \
                    re.search(r"Room \d+", building_line) is None:
                room_info["building"] = building_line
                curr_line = next(line_iterator)
            else:
                room_info["building"] = None

            # Parse roomNumber (stored in roomInfo)
            room_line = curr_line
            room_num = re.search(r"Room (\d+)", building_line)
            if room_num is not None:
                room_info["roomNumber"] = room_num.group(1)
            elif building_line == "Room TBA" or room_line == "Room TBA":
                room_info["roomNumber"] = "TBA"
            elif building_line == "Room VIRTUAL" or room_line == "Room VIRTUAL":
                room_info["roomNumber"] = "VIRTUAL"
            elif building_line == "Room GNHS" or room_line == "Room GNHS":
                room_info["roomNumber"] = "GNHS" # No idea what this is
            else:
                room_info["roomNumber"] = room_line.replace(", Room ", "")
            meeting_info["roomInfo"] = room_info

            all_meeting_info.append(meeting_info)
            if curr_line is not None:
                curr_line = next(line_iterator, None)

        return all_meeting_info

    def perform_meeting_type(self, curr_line, meeting_info):
        '''
        A function to get the meeting type and the days.
        '''
        if curr_line.startswith("Distance Education"):
            meeting_info["type"] = "Distance Education"
        else:
            line_split = curr_line.split(" ")
            meeting_info["type"] = line_split[0]

        # Parse daysOfWeek
        days = curr_line.replace(meeting_info["type"] + " ", "")
        if days == "Days TBA":
            meeting_info["daysOfWeek"] = None
        else:
            meeting_info["daysOfWeek"] = days.split(", ")

    def parse_times(self, line_iterator, meeting_info):
        """
        Parse the start and end times of the meeting and return
        the current line.
        """
        times_line = next(line_iterator)
        if times_line != "Times TBA":
            time_split = times_line.split(" - ")
            end_time_split = time_split[1].split(" ")
            meeting_info["startTime"] = time_split[0]
            meeting_info["endTime"] = end_time_split[0]
        else:
            meeting_info["startTime"] = None
            meeting_info["endTime"] = None
        return times_line

    def error(self, message):
        print(message)


def export_to_json(dictionary, filename):
    '''
    Basic function to port to json
    '''
    with open(filename, "w", encoding="utf-8") as outfile:
        json.dump(dictionary, outfile)

def parse_courses(in_filename, out_filename):
    '''
    A small try catch for opening the file and reading line by line
    It would be too much memory to read all at once, so it will read line
    by line
    '''
    try:
        with open(in_filename, "r", encoding="utf-8") as file:
            parser = ParseData()
            for line in file:
                parser.feed(line.strip())
            parser.close()
            export_to_json(parser.courses_array, out_filename)
            courses_processed = len(parser.courses_array)
            print(f'Successfully parsed {courses_processed} courses to {out_filename}!')
    except IOError:
        print("The file could not be opened")

# Entry point of the program
if __name__ == "__main__":
    IN_FILENAME = sys.argv[1]
    OUT_FILENAME = sys.argv[2]
    parse_courses(IN_FILENAME, OUT_FILENAME)
