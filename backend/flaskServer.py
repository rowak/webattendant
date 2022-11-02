
from flask import Flask, request, jsonify, Response
import json
import random
import os

with open("courseOutput.json") as file:
    courseList = json.load(file)
app = Flask(__name__, static_folder='..',  static_url_path='/')
 
@app.after_request
def applyCaching(response):
    # Disable CORS in development mode
    if os.environ.get("FLASK_ENVIRONMENT", "") == "development":
        response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route('/ping')
def healthCheck():
    return "pong!"

@app.route('/allCourses', methods=['GET'])
def allCourses():
    return courseList

@app.route('/getCourse', methods=['GET'])
def getCourse():
    if "code" not in request.args:
        return Response(json.dumps({"error": "No course specified."}), status=400)
    
    code = request.args["code"]
    if "sectionCode" in request.args:
        section = request.args["sectionCode"]
    else:
        section = None
    course = findCourse(code, section)

    if course == None:
        return Response(json.dumps({"error": "Course not found."}), status=404)
    else:
        return course

# Searches for courses given a query string.
# Allowed searches include:
#  - Search by course code
#  - Search by course code and section
#  - Search by course name
#  - Search by professor name
@app.route('/search', methods=['GET'])
def search():
    if "query" not in request.args:
        return Response(json.dumps({"error": "No search query specified."}), status=400)

    query = request.args["query"]
    
    return search(query)

@app.route('/randomCourse', methods=['GET'])
def randomCourse():
    i = random.randint(0, len(courseList) - 1)
    resp = Response(json.dumps(courseList[i]))
    return resp

def search(query):
    query = query.lower().strip()
    queryParts = query.upper().split("*")
    if len(queryParts) > 3:
        # Query is in an unrecognized format
        return []
    elif len(queryParts) == 3:
        # Query is (maybe) in the format COURSE*CODE*SECTIONCODE
        courseCode = (queryParts[0] + queryParts[1]).upper()
        sectionCode = queryParts[2].lstrip("0")
    elif len(queryParts) == 2:
        # Query is (maybe) in the format COURSE*CODE
        courseCode = query.upper().replace("*", "")
        sectionCode = None
    else:
        # Query is (maybe) in the format COURSECODE
        courseCode = queryParts[0]
        sectionCode = None

    courses = []
    for course in courseList:
        # Check for courses with a matching course code
        if course["code"].replace("*", "") == courseCode:
            if sectionCode != None:
                # Check for courses with a matching section code (if required)
                for section in course["sections"]:
                    if section["code"].lstrip("0") == sectionCode:
                        courses.append(getCourseWithSection(course, sectionCode))
            else:
                for section in course["sections"]:
                    courses.append(getCourseWithSection(course, section["code"]))
        else:
            for section in course["sections"]:
                # Check for sections with a matching name
                if courseNameMatchesQuery(section["name"], query):
                    courses.append(getCourseWithSection(course, section["code"]))
                # Check for sections with a matching instructor
                else:
                    for teacher in section["teachers"]:
                        if teacher.lower().strip() == query:
                            courses.append(getCourseWithSection(course, section["code"]))
                            break
    return courses

# This is a simple method of determining if a course name
# satisfies a search query. Each word in the query is compared
# to each word in the course name. If all of the words in the
# query match some or all of the words in the course name, then
# the query matches the name. Words with less than 4 characters
# are ignored.
def courseNameMatchesQuery(courseName, query):
    if len(query) <= 3:
        return False
    numMatchingWords = 0
    queryWords = query.split(" ")
    nameWords = courseName.lower().split(" ")
    for wordQ in queryWords:
        for wordN in nameWords:
            if wordQ == wordN:
                numMatchingWords += 1
                break
    return numMatchingWords >= len(queryWords)

# Finds a course in the course list based on a specific
# course code and (optionally) a section code.
def findCourse(code, sectionCode):
    code = code.upper().replace("*", "")
    if sectionCode != None:
        sectionCode = sectionCode.lstrip("0")
    for course in courseList:
        if course["code"].replace("*", "") == code:
            if sectionCode != None:
                for section in course["sections"]:
                    if section["code"].lstrip("0") == sectionCode:
                        return getCourseWithSection(course, sectionCode)
                return None
            else:
                return course
    return None

# Returns a copy of a course object with only a specific section
# (all others removed).
def getCourseWithSection(course, sectionCode):
    sectionCode = sectionCode.lstrip("0")
    courseCopy = course.copy()
    sections = []
    for section in course["sections"]:
        if section["code"].lstrip("0") == sectionCode:
            sections.append(section)
    courseCopy["sections"] = sections
    return courseCopy