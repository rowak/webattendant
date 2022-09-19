import json
import sys

def SearchCourseByCode(filename,coursecode):
    # open the file, print error and exit if there is an error opening the file
    try:
        with open(filename,'r') as f:
            data = json.load(f)
    except:
        print("The file could not be opened.")
        quit()
    
    # add an asterisk between the characters and the digits of the course code
    if('*' not in coursecode):
        for i in range(len(coursecode)):
            if(coursecode[i].isdigit()):
                coursecode = coursecode[:i] + '*' + coursecode[i:]
                break
    courseFound = False

    coursecode = coursecode.lower()

    courses = []
    # loop through courses in the json file and see if course exists
    for course in data:
        if(course['code'].lower() == coursecode):
            # course found
            courses.append(course)
    
    if len(courses) > 0:
        display_courses(courses)
    else:
        print("Course not found.")
    

def SearchCourseByName(filename,coursename):
    # open the file, print error and exit if there is an error opening the file
    try:
        with open(filename,'r') as f:
            data = json.load(f)
    except:
        print("The file could not be opened.")
        quit()

    # standardize the query
    coursename = coursename.lower()

    courseFound = False
    # loop through courses in the json file and see if course exists
    course = None
    sections = []
    for i in range(len(data)):
        # check if course object has a sections object
        if(data[i].get('sections')):
            for section in data[i].get('sections'):
                if(section['name'].lower() == coursename):
                    sections.append(section)
                    course = data[i]
                    
    if(len(sections) > 0):
        display_course_sections(course, sections)
    else:
        print("Course not found.")


def SearchByProfessor(filename,professorname):
    # open the file, print error and exit if there is an error opening the file
    try:
        with open(filename,'r') as f:
            data = json.load(f)
    except:
        print("The file could not be opened.")
        quit()
    
    # standardize the query
    professorname = professorname.lower()

    courses = []
    # loop through courses in the json file and see if course exists
    for i in range(len(data)):
        course = {"code": data[i]["code"], "sections": []}
        # check if course object has a sections object
        if(data[i].get('sections')):
            for section in data[i].get('sections'):
                # check if section object has a teachers field
                if(section.get('teachers')):
                    for professor in section['teachers']:
                        if(professor.lower() == professorname):
                            course["sections"].append(section)
        if len(course["sections"]) > 0:
            courses.append(course)

    if(len(courses) > 0):
        for course in courses:
            display_course(course)
    else:
        print("Course not found.")

## Displays an array of courses formatted as a table.
#
#  courses -- the courses to display
#  showsections -- when this flag is set, the sections for a course are displayed
#  showmeetings -- when this flag is set, the meetings for a course are displayed.
#                  Note that the showsections flag must also be set.
def display_courses(courses):
    for course in courses:
        display_course(course)

## Displays a course formatted as a table.
#
#  course -- the course to display
#  showsections -- when this flag is set, the sections for a course are displayed
#  showmeetings -- when this flag is set, the meetings for a coruse are displayed.
#                  Note that the showsections flag must also be set.
#  courses -- the list of all courses that are being displayed (used for table formatting)
def display_course(course):
    print("\n" + course["code"])
    print("|")
    display_sections(course["sections"])

## Displays specific sections from a course formatted as a table.
#
#  course -- the course to display
#  showsections -- when this flag is set, the sections for a course are displayed
#  showmeetings -- when this flag is set, the meetings for a coruse are displayed.
#                  Note that the showsections flag must also be set.
#  courses -- the list of all courses that are being displayed (used for table formatting)
def display_course_sections(course, sections):
    print("\n" + course["code"])
    print("|")
    display_sections(sections)

## Displays the sections of a course formatted as a table.
#
#  sections -- the sections from a course
def display_sections(sections):
    print("+--", end="")
    maxCodeLen = get_max_property_length(sections, "code", "CODE")
    maxIdLen = get_max_property_length(sections, "id", "ID")
    maxNameLen = get_max_property_length(sections, "name", "NAME")
    maxTermLen = get_max_property_length(sections, "term", "TERM")
    maxStatusLen = get_max_property_length(sections, "status", "STATUS")
    maxLocationLen = get_max_property_length(sections, "location", "LOCATION")
    maxInstructorsLen = get_max_property_length(sections, "teachers", "INSTRUCTORS")
    maxCapacityLen = get_max_property_length(sections, "capacity", "CAPACITY")
    maxCreditsLen = get_max_property_length(sections, "credits", "CREDITS")
    maxLevelLen = get_max_property_length(sections, "academicLevel", "LEVEL")
    print("CODE" + " "*(maxCodeLen[0]), end="")
    print("ID" + " "*(maxIdLen[0]), end="")
    print("NAME" + " "*(maxNameLen[0]), end="")
    print("TERM" + " "*(maxTermLen[0]), end="")
    print("STATUS" + " "*(maxStatusLen[0]), end="")
    print("LOCATION" + " "*(maxLocationLen[0]), end="")
    print("INSTRUCTORS" + " "*maxInstructorsLen[0], end="")
    print("CAPACITY" + " "*maxCapacityLen[0], end="")
    print("CREDITS" + " "*maxCreditsLen[0], end="")
    print("LEVEL" + " "*maxLevelLen[0], end="")
    print()

    i = 0
    for section in sections:
        print(" "*3, end="")
        teachers = ", ".join(section["teachers"])
        capacity = str(section["availableCapacity"]) + " / " + str(section["capacity"])
        print(section["code"] + " "*(maxCodeLen[1]-len(section["code"])), end="")
        print(section["id"] + " "*(maxIdLen[1]-len(section["id"])), end="")
        print(section["name"] + " "*(maxNameLen[1]-len(section["name"])), end="")
        print(section["term"] + " "*(maxTermLen[1]-len(section["term"])), end="")
        print(section["status"] + " "*(maxStatusLen[1]-len(section["status"])), end="")
        print(section["location"] + " "*(maxLocationLen[1]-len(section["location"])), end="")
        print(teachers + " "*(maxInstructorsLen[1]-len(teachers)), end="")
        print(capacity + " "*(maxCapacityLen[1]-len(str(capacity))), end="")
        print(str(section["credits"]) + " "*(maxCreditsLen[1]-len(str(section["credits"]))), end="")
        print(section["academicLevel"] + " "*(maxLevelLen[1]-len(section["academicLevel"])), end="")
        print()
        if i < len(sections)-1:
            continueTree = True
        else:
            continueTree = False
        if "meetings" in section:
            display_meeting_info(section["meetings"], continueTree)
        i += 1

## Displays the meeting information for a section formatted in a table.
#
#  meetingInfo -- an array of meetings
#  continuetree -- appends extra pipe characters to simulate the appearance of a tree.
#                  Set this value to True for the first n-1 meetingInfo arrays and
#                  set it to False for the final meetingInfo array.
def display_meeting_info(meetingInfo, continuetree):
    print("   |\n   +---", end="")

    roomInfos = [m["roomInfo"] for m in meetingInfo]
    maxMeetingTypeLen = get_max_property_length(meetingInfo, "type", "MEETING TYPE")
    maxDaysLen = get_max_property_length(meetingInfo, "daysOfWeek", "DAYS")
    maxTimeLen = get_max_property_length(meetingInfo, "time", "TIME")
    maxDateLen = get_max_property_length(meetingInfo, "date", "DATE")
    maxBuildingLen = get_max_property_length(roomInfos, "building", "BUILDING")
    maxRoomLen = get_max_property_length(roomInfos, "roomNumber", "ROOM")
    print("MEETING TYPE" + " "*(maxMeetingTypeLen[0]), end="")
    print("DAYS" + " "*(maxDaysLen[0]), end="")
    print("TIME" + " "*(maxTimeLen[0]), end="")
    print("DATE" + " "*(maxDateLen[0]), end="")
    print("BUILDING" + " "*(maxBuildingLen[0]), end="")
    print("ROOM" + " "*(maxRoomLen[0]))

    for meeting in meetingInfo:
        if continuetree:
            print("   |   ", end="")
        else:
            print("       ", end="")   
        roomInfo = meeting["roomInfo"]
        days = meeting["daysOfWeek"]
        if days == None:
            days = "TBA"
        else:
            days = ", ".join(meeting["daysOfWeek"])
        time = f'{meeting["startTime"]} - {meeting["endTime"]}'
        date = meeting["date"]
        building = roomInfo["building"]
        if date == None:
            date = "N/A"
        if building == None:
            building = "TBA"
        print(meeting["type"] + " "*(maxMeetingTypeLen[1]-len(meeting["type"])), end="")
        print(days + " "*(maxDaysLen[1]-len(days)), end="")
        print(time + " "*(maxTimeLen[1]-len(time)), end="")
        print(date + " "*(maxDateLen[1]-len(date)), end="")
        print(building + " "*(maxBuildingLen[1]-len(building)), end="")
        print(roomInfo["roomNumber"] + " "*(maxBuildingLen[1]-len(roomInfo["roomNumber"])))
    if continuetree:
        print("   |")

## Calculates the maximum length of a property in a generic object to allow even spacing in a table.
#  Three spaces are also added to separate each property.
#
#  objects -- an array of generic objects containing the property
#  property -- the target property
#  title -- the title of the property as it appears in the table
def get_max_property_length(objects, property, title):
    maxLen = 0
    currLen = 0
    for obj in objects:
        if property == "capacity":
            ele = str(obj["availableCapacity"]) + " / " + str(obj["capacity"])
            currLen = len(ele)
        elif property == "time":
            if obj["startTime"] == None or obj["endTime"] == None:
                ele = "TBA"
            else:
                ele = str(obj["startTime"] + " - " + obj["endTime"])
            currLen = len(ele)
        elif isinstance(obj[property], list):
            li = ", ".join(obj[property])
            currLen = len(li)
        else:
            data = obj[property]
            if data == None:
                data = "N/A"
            currLen = len(str(data))
        if currLen > maxLen:
            maxLen = currLen
    maxPropertyLen = maxLen
    titleLen = maxLen + 3 - len(title)
    if titleLen < 3 or titleLen == len(title):
        titleLen = 3
    propertyLen = max(len(title)+3, maxLen+3)
    return (titleLen, propertyLen)

if __name__ == "__main__":
    inputfile = sys.argv[1]

    userOption = ""
    while (userOption.strip() != "4"):
        print("1) Search by course code")
        print("2) Search by course name")
        print("3) Search by professor")
        print("4) Exit")
        
        print("Select an option from the above menu: ", end="")
        userOption = input()

        if userOption == "1":
            print("Enter the course code: ", end="")
            query = input()
            SearchCourseByCode(inputfile, query)
        elif userOption == "2":
            print("Enter the course name: ", end="")
            query = input()
            SearchCourseByName(inputfile, query)
        elif userOption == "3":
            print("Enter the professor name (L. First): ", end="")
            query = input()
            SearchByProfessor(inputfile, query)
        elif userOption == "4":
            exit()
        
        print("\n")