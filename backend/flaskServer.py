
from flask import Flask, request
import json
import random

with open("backend/courseOutput.json") as file:
    courseList = json.load(file)
app = Flask(__name__, static_folder='../build',  static_url_path='/')

@app.route('/')
def homePage():
    return app.send_static_file("index.html")

@app.route('/allCourses', methods=['GET'])
def allCourses():
    return courseList

@app.route('/getCourse', methods=['POST'])
def getCourse(i):
    return courseList[i]

@app.route('/randomCourse', methods=['GET'])
def randomCourse():
    i = random.randint(0, len(courseList) - 1)
    return courseList[i]