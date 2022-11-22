'''
The backend server that will service requests.
Runs on localhost, but hosted through NGINX
'''
import json
import random
import os
from datetime import datetime
from flask import Flask, request, Response

with open("courseOutputF22.json", encoding="utf-8") as file:
    course_list = json.load(file)
with open("courseOutputW23.json", encoding="utf-8") as file:
    course_list_temp = json.load(file)
    for c in course_list_temp:
        course_list.append(c)
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
        name = sec['sections'][0]['name'].lower().strip()
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
            newprof = prof.lower().strip()
            if newprof not in new_list:
                new_list[newprof] = []
            new_list[newprof].append(sec)

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
    term = None
    if "term" in request.args:
        term = request.args["term"].lower()

    return Response(json.dumps(search_with_query(query, term)), mimetype="application/json")

@app.route('/randomCourse', methods=['GET'])
def random_course():
    '''
    A function that will return a random course.
    '''
    course = {}
    found_courses = []
    section = None
    term = None
    courses = None
    names = None
    count = 0
    find = 0
    algorithm = None
    ignore_flag = True

    if "term" in request.args:
        term = request.args["term"]

    if "algorithm" in request.args:
        algorithm = request.args["algorithm"]

    courses = reconstruct_courses(request.args.getlist("courses[]"))
    names = construct_names(courses)
    find = 5 - len(courses)

    if term is not None and find > 0:
        while count < 10000 and len(found_courses) < find:
            count += 1
            i = random.randint(0, len(section_list) - 1)
            course = section_list[i]
            section = course["sections"][0]
            if section["status"].lower() == "open" and section["term"].lower() == term.lower():
                if ignore_tba(course, ignore_flag) and in_names(course, names):
                    if check_all_conflict(course, courses, found_courses, algorithm):
                        found_courses.append(course)
    return found_courses

def reconstruct_courses(basic_courses):
    '''
    A function to reconstruct the course list based on limited data
    '''
    courses = []
    for entry in basic_courses:
        basic = entry.split(':')
        for course in section_list:
            if course["code"] == basic[0]:
                if course["sections"][0]["code"] == basic[1]:
                    if course["sections"][0]["term"] == basic[2]:
                        courses.append(course)
    return courses

def construct_names(courses):
    '''
    A function to construct a list of all the course names
    '''
    result = []
    for course in courses:
        result.append(course["code"])
    return result

def in_names(course, names):
    '''
    A small function to see if a name appears in the list of names
    '''
    for name in names:
        if name == course["code"]:
            return False
    return True

def ignore_tba(course, ignore_flag):
    '''
    This will check if a course given has only TBA times
    If the course has only tba times and the ignore flag is set
    to true, it will return false.
    Otherwise it will return true
    '''
    if ignore_flag is False:
        return True

    section = course["sections"][0]
    if "meetings" in section:
        for meet in section["meetings"]:
            if meet["type"].upper() != "EXAM":
                if meet["startTime"] is not None and meet["endTime"] is not None:
                    return True
    return False

def check_all_conflict(curr_course, courses, found_courses, algorithm):
    '''
    A function that will perform the check for all courses, including those found.
    It will also check if the course matches the algorithm.
    '''
    if apply_algorithm(curr_course, algorithm) is False:
        return False
    if check_conflict(curr_course, courses) is False:
        return False
    return check_conflict(curr_course, found_courses)

def check_conflict(curr_course, courses):
    '''
    A small function that will take a course and
    return if that generates a conflict with a list provided.
    Returns true if no conflict was found
    Returns false if there was some problem
    '''
    if courses is None:
        return False

    if "meetings" not in curr_course["sections"][0]:
        return True

    for curr_meeting in curr_course["sections"][0]["meetings"]:
        for course in courses:
            if "meetings" in course["sections"][0]:
                for meeting in course["sections"][0]["meetings"]:
                    if compare_times(curr_meeting, meeting):
                        return False
    return True

def compare_times(curr_meeting, meeting):
    '''
    A function to compare 2 meetings. If the current meeting has
    a conflicting time, it will return true.
    '''
    if curr_meeting["startTime"] is None or curr_meeting["endTime"] is None:
        return False

    if meeting["startTime"] is None or meeting["endTime"] is None:
        return False

    if curr_meeting["type"] == "EXAM" or meeting["type"] == "EXAM":
        return False

    curr_start = datetime.strptime(curr_meeting["startTime"], "%I:%M%p")
    curr_end = datetime.strptime(curr_meeting["endTime"], "%I:%M%p")
    start_time = datetime.strptime(meeting["startTime"], "%I:%M%p")
    end_time = datetime.strptime(meeting["endTime"], "%I:%M%p")

    for day in curr_meeting["daysOfWeek"]:
        if day in meeting["daysOfWeek"]:
            if start_time <= curr_start <= end_time or end_time >= curr_end >= start_time:
                return True
            if curr_start <= start_time <= end_time <= curr_end:
                return True
    return False

def apply_algorithm(course, algorithm):
    '''
    A method that will check the algorithm and apply a function
    based on the algorithm.
    Returns true if it passed the algorithm
    Returns false otherwise
    '''
    result = True
    if algorithm == "NoTuesThurs":
        result = no_tues_thurs(course)
    elif algorithm == "NoFriday":
        result = no_friday(course)

    return result

def no_tues_thurs(course):
    '''
    Will check if the course does not have a meeting on tuesday or thursday
    Returns true if no meetings are on tuesday or thursday
    Returns false otherwise
    '''
    if "meetings" in course["sections"][0]:
        for meeting in course["sections"][0]["meetings"]:
            if meeting["daysOfWeek"] is not None and meeting["type"].upper() != "EXAM":
                for day in meeting["daysOfWeek"]:
                    if day.lower() == "tues" or day.lower() == "thur":
                        return False
    return True

def no_friday(course):
    '''
    Will check if the course has a non-exam meeting on a friday
    Returns true if no firday meetings
    '''
    if "meetings" in course["sections"][0]:
        for meeting in course["sections"][0]["meetings"]:
            if meeting["daysOfWeek"] is not None and meeting["type"].upper() != "EXAM":
                for day in meeting["daysOfWeek"]:
                    if day.lower() == "fri":
                        return False
    return True

def search_with_query(query, term):
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

    courses = search_each_course(query, course_code, section_code)

    final_courses = []
    for course in courses:
        for section in course["sections"]:
            if term is None or term == section["term"].lower():
                final_courses.append(course)
                break

    return final_courses

def search_each_course(query, course_code, section_code):
    '''
    A function to perform the query on each individual course currently
    stored.
    '''
    courses = []
    if course_code in course_sort:
        courses = courses + code_match(course_sort[course_code], section_code)
    else:
        courses = courses + other_search(query)
    return courses

def code_match(course, section_code):
    '''
    If the code matches the course, then this function is run.
    '''
    result = course
    # If the section code is provided, then look through each entry
    # to see if there is a match
    if section_code is not None:
        # Check for courses with a matching section code (if required)
        result = []
        for entry in course:
            for section in entry["sections"]:
                if section["code"].lstrip("0") == section_code:
                    result.append(entry)
    return result

def other_search(query):
    '''
    Will perform the other kinds of searches on the file.
    '''
    result = []
    if query in prof_sort:
        result = prof_sort[query]
    elif query.lower().strip() in name_sort:
        result = name_sort[query.lower().strip()]
    else:
        result = []
        for entry in section_list:
            if course_name_matches_query(entry["sections"][0]["name"], query):
                result.append(entry)
    return result

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

    if code in course_sort:
        if section_code is not None:
            for course in course_sort[code]:
                if course["sections"][0]["code"].lstrip("0") == section_code:
                    return course
        else:
            return course_sort[code]

    return None
