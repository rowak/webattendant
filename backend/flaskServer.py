
from flask import Flask, request, jsonify, Response
import json
import random

with open("courseOutput.json") as file:
    courseList = json.load(file)
app = Flask(__name__, static_folder='..',  static_url_path='/')

@app.route('/')
def homePage():
    return "hello world"

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

@app.route('/randomCourse', methods=['GET'])
def randomCourse():
    i = random.randint(0, len(courseList) - 1)
    return courseList[i]

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
    courseCopy = course.copy()
    sections = []
    for section in course["sections"]:
        if section["code"].lstrip("0") == sectionCode:
            sections.append(section)
    courseCopy["sections"] = sections
    return courseCopy