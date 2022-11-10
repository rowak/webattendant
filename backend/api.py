'''
The backend server that will service requests.
Runs on localhost, but hosted through NGINX
'''
import json
import random
import os
from flask import Flask, request, Response

with open("courseOutput.json", encoding="utf-8") as file:
    course_list = json.load(file)
app = Flask(__name__, static_folder='..', static_url_path='/')

def create_section_list(list_c):
    '''
    A function to create a new list, where each entry acts
    as a single section entry.
    '''
    new_list = []
    for course in list_c:
        for section in course['sections']:
            new_entry = {
                'code': course["code"],
                'sections': []
            }
            new_entry['sections'].append(section)
            new_list.append(new_entry)

    return new_list

def create_course_sort(sec_list):
    '''
    A function that will return a dictionary where every key will be a course
    code and every value will be an array of all the courses that share the code
    in a format similar to what we return.
    '''
    new_list = {}
    for sec in sec_list:
        code = sec['code'].upper().replace("*", "")
        if code not in new_list:
            new_list[code] = []

        new_list[code].append(sec)

    return new_list

def create_name_sort(sec_list):
    '''
    A function that will return a dictionary where every key will be a course
    name and every value will be an array of all the courses that share the name
    in a format similar to what we return.
    '''
    new_list = {}
    for sec in sec_list:
        name = sec['sections'][0]['name']
        if name not in new_list:
            new_list[name] = []

        new_list[name].append(sec)

    return new_list

def create_prof_sort(sec_list):
    '''
    A function that will return a dictionary where every key will be a professor's name
    and every value will be an array of all the courses that share the name
    in a format similar to what we return.
    '''
    new_list = {}
    for sec in sec_list:
        for prof in sec['sections'][0]['teachers']:
            if prof not in new_list:
                new_list[prof] = []
            new_list[prof].append(sec)

    return new_list

section_list = create_section_list(course_list)
course_sort = create_course_sort(section_list)
name_sort = create_name_sort(section_list)
prof_sort = create_prof_sort(section_list)


@app.after_request
def apply_caching(response):
    '''
    Disable CORS in development mode.
    '''
    if os.environ.get("FLASK_ENVIRONMENT", "") == "development":
        response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route('/ping')
def health_check():
    '''
    A small request that will return "pong!"
    '''
    return "pong!"

@app.route('/allCourses', methods=['GET'])
def all_courses():
    '''
    Debug function that will return every course stored.
    '''
    return course_list

@app.route('/getCourse', methods=['GET'])
def get_course():
    '''
    A function that will get a course entry, including all sections.
    '''
    if "code" not in request.args:
        return Response(json.dumps({"error": "No course specified."}), status=400)

    code = request.args["code"]
    if "sectionCode" in request.args:
        section = request.args["sectionCode"]
    else:
        section = None
    course = find_course(code, section)

    if course is None:
        return Response(json.dumps({"error": "Course not found."}), status=404)
    return course

@app.route('/search', methods=['GET'])
def search():
    '''
    Searches for courses given a query string.
    Allowed searches include:
     - Search by course code
     - Search by course code and section
     - Search by course name
     - Search by professor name
    '''
    if "query" not in request.args:
        return Response(json.dumps({"error": "No search query specified."}), status=400)

    query = request.args["query"]

    return search_with_query(query)

@app.route('/randomCourse', methods=['GET'])
def random_course():
    '''
    A function that will return a random course.
    '''
    i = random.randint(0, len(course_list) - 1)
    course = course_list[i]
    section = []
    j = random.randint(0, len(course["sections"]) - 1)
    section.append(course["sections"][j])
    resp = {
        'code': course["code"],
        'sections': section
    }
    return resp

def search_with_query(query):
    '''
    Performs a search to find the course in the course_list array.
    Will first parse the input to make sure it is in a recognizable format,
    then will perform a search through the courses to see if it matches an
    field in the input. If it does, then the course will be added.
    '''
    query = query.lower().strip()
    query_parts = query.upper().split("*")
    if len(query_parts) > 3:
        # Query is in an unrecognized format
        return []

    if len(query_parts) == 3:
        # Query is (maybe) in the format COURSE*CODE*SECTIONCODE
        course_code = (query_parts[0] + query_parts[1]).upper()
        section_code = query_parts[2].lstrip("0")
    elif len(query_parts) == 2:
        # Query is (maybe) in the format COURSE*CODE
        course_code = query.upper().replace("*", "")
        section_code = None
    else:
        # Query is (maybe) in the format COURSECODE
        course_code = query_parts[0]
        section_code = None

    return search_each_course(query, course_code, section_code)

def search_each_course(query, course_code, section_code):
    '''
    A function to perform the query on each individual course currently
    stored.
    '''
    courses = []
    for course in course_list:
        # Check for courses with a matching course code
        if course["code"].replace("*", "") == course_code:
            code_match(courses, course, section_code)
        else:
            other_search(courses, course, query)
    return courses

def code_match(courses, course, section_code):
    '''
    If the code matches the course, then this function is run.
    '''
    if section_code is not None:
    # Check for courses with a matching section code (if required)
        for section in course["sections"]:
            if section["code"].lstrip("0") == section_code:
                courses.append(get_course_with_section(course, section_code))
    else:
        for section in course["sections"]:
            courses.append(get_course_with_section(course, section["code"]))

def other_search(courses, course, query):
    '''
    Will perform the other kinds of searches on the file.
    '''
    for section in course["sections"]:
        # Check for sections with a matching name
        if course_name_matches_query(section["name"], query):
            courses.append(get_course_with_section(course, section["code"]))
        # Check for sections with a matching instructor
        else:
            for teacher in section["teachers"]:
                if teacher.lower().strip() == query:
                    courses.append(get_course_with_section(course, section["code"]))
                    break

def course_name_matches_query(course_name, query):
    '''
    This is a simple method of determining if a course name
    satisfies a search query. Each word in the query is compared
    to each word in the course name. If all of the words in the
    query match some or all of the words in the course name, then
    the query matches the name. Words with less than 4 characters
    are ignored.
    '''
    if len(query) <= 3:
        return False
    num_matching_words = 0
    query_words = query.split(" ")
    name_words = course_name.lower().split(" ")
    for word_q in query_words:
        for word_n in name_words:
            if word_q == word_n:
                num_matching_words += 1
                break
    return num_matching_words >= len(query_words)

def find_course(code, section_code):
    '''
    Finds a course in the course list based on a specific
    course code and (optionally) a section code.
    '''
    code = code.upper().replace("*", "")
    if section_code is not None:
        section_code = section_code.lstrip("0")
    for course in course_list:
        if course["code"].replace("*", "") == code:
            if section_code is not None:
                for section in course["sections"]:
                    if section["code"].lstrip("0") == section_code:
                        return get_course_with_section(course, section_code)
                return None
            return course
    return None

def get_course_with_section(course, section_code):
    '''
    Returns a copy of a course object with only a specific section
    (all others removed).
    '''
    section_code = section_code.lstrip("0")
    course_copy = course.copy()
    sections = []
    for section in course["sections"]:
        if section["code"].lstrip("0") == section_code:
            sections.append(section)
    course_copy["sections"] = sections
    return course_copy
