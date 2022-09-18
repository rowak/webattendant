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
    for i in range(len(coursecode)):
        if(coursecode[i].isdigit()):
            coursecode = coursecode[:i] + '*' + coursecode[i:]
            break
    courseFound = False

    # loop through courses in the json file and see if course exists
    for course in data:
        if(course['code'] == coursecode):
            # course found
            courseFound = True
            print("Found")
            break
    if(not courseFound):
        print("Course not found.")
    

def SearchCourseByName(filename,coursename):
    # open the file, print error and exit if there is an error opening the file
    try:
        with open(filename,'r') as f:
            data = json.load(f)
    except:
        print("The file could not be opened.")
        quit()

    courseFound = False
    # loop through courses in the json file and see if course exists
    for i in range(len(data)):
        # check if course object has a sections object
        if(data[i].get('sections')):
            for section in data[i].get('sections'):
                if(section['name'] == coursename):
                    print("Found")
                    courseFound = True
                    break
    if(not courseFound):
        print("Course not found.")


def SearchByProfessor(filename,professorname):
    # open the file, print error and exit if there is an error opening the file
    try:
        with open(filename,'r') as f:
            data = json.load(f)
    except:
        print("The file could not be opened.")
        quit()

    courseFound = False
    # loop through courses in the json file and see if course exists
    for i in range(len(data)):
        # check if course object has a sections object
        if(data[i].get('sections')):
            for section in data[i].get('sections'):
                # check if section object has a teachers field
                if(section.get('teachers')):
                    for professor in section['teachers']:
                        if(professor == professorname):
                            print("Found")
                            courseFound = True
                            break
    if(not courseFound):
        print("Course not found.")

# SearchCourseByCode('../../courses.json','ACCT1220')
# SearchCourseByName('../../courses.json','Intro Financial Accounting')
# SearchByProfessor('../../courses.json','P. Lassou')