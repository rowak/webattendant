"""This module tests classes in the api module."""
import unittest
import json
from api import app

class TestSearch(unittest.TestCase):
    """This class tests methods in the api module."""

    def search(self, params):
        """Helper method for sending GET /search"""
        result = app.test_client().get("/search", query_string=params)
        return json.loads(result.get_data(as_text=True))

    def test_search_course_code_returns_valid_courses_with_star_uppercase(self):
        """Test if searching by course code (CIS*3760) returns the correct courses."""
        result = self.search({
            "query": "CIS*3760"
        })
        for course in result:
            assert course["code"] == "CIS*3760"

    def test_search_course_code_returns_valid_courses_without_star_uppercase(self):
        """Test if searching by course code (CIS3760) returns the correct courses."""
        result = self.search({
            "query": "CIS3760"
        })
        for course in result:
            assert course["code"] == "CIS*3760"

    def test_search_course_code_returns_valid_courses_with_star_lowercase(self):
        """Test if searching by course code (cis*3760) returns the correct courses."""
        result = self.search({
            "query": "cis*3760"
        })
        for course in result:
            assert course["code"] == "CIS*3760"

    def test_search_course_code_returns_valid_courses_without_star_lowercase(self):
        """Test if searching by course code (cis3760) returns the correct courses."""
        result = self.search({
            "query": "cis3760"
        })
        for course in result:
            assert course["code"] == "CIS*3760"

    def test_search_course_name_returns_valid_courses(self):
        """Test if searching by course name returns the correct courses."""
        result = self.search({
            "query": "Software Engineering"
        })
        for course in result:
            for section in course["sections"]:
                assert section["name"] == "Software Engineering"

    def test_search_partial_course_name_returns_valid_courses(self):
        """Test if searching by course name returns the correct courses."""
        result = self.search({
            "query": "Software"
        })
        for course in result:
            for section in course["sections"]:
                assert "Software" in section["name"]

    def test_search_professor_returns_valid_courses(self):
        """Test if searching by professor name returns the correct courses."""
        result = self.search({
            "query": "G. Klotz"
        })
        for course in result:
            for section in course["sections"]:
                assert "G. Klotz" in section["teachers"]

    def test_search_returns_invalid_courses(self):
        '''
        Will test if given an invalid input, it will give an invalid response
        '''
        result = self.search({
            "query": "INVALIDCOURSE"
        })
        assert len(result) == 0

    def test_search_course_code_with_section_number(self):
        """Test if searching by course code (CIS*3760) and 0101 section number returns the correct courses."""
        result = self.search({
            "query": "CIS*3760*0101"
        })
        assert result[0]['sections'][0]['code']=='0101'

class TestGetCourse(unittest.TestCase):
    '''
    A class to test the getCourse functionality
    '''

    def get_query(self, params):
        '''
        Helper function for sending GET /getCourse
        '''
        result = app.test_client().get("/getCourse", query_string=params)
        return json.loads(result.get_data(as_text=True))

    def test_find_course(self):
        '''
        Will test the find course function, to see if it returns something
        '''
        result = self.get_query({
            "code": "CIS*3760"
        })
        for course in result:
            assert 'code' in course

    def test_find_course_with_section_code(self):
        '''
        Will test the find course function with section code, to see if it returns something
        '''
        result = self.get_query({
            "code": "CIS*3760", "sectionCode": "0101"
        })
        assert 'code' in result

class TestGetRandomCourse(unittest.TestCase):
    '''
    A class to test the getRandomCourse functionality
    '''

    def get_query(self, params):
        '''
        Get query, sending GET /randomCourse
        '''

        result = app.test_client().get("/randomCourse", query_string=params)
        return json.loads(result.get_data(as_text=True))

    def test_get_random_course(self):
        '''
        Test if get random course returns a random course as a result
        '''
        result = self.get_query({
            "code": "CIS*3760", "sectionCode": "0101"
        })
        assert 'code' in result


class TestGetAllCourses(unittest.TestCase):
    '''
    A class to test the all courses functionality
    '''

    def get_query(self, params):
        '''
        Helper function for sending GET /allCourses
        '''
        result = app.test_client().get("/allCourses", query_string=params)
        return json.loads(result.get_data(as_text=True))

    def test_get_all_courses(self):
        '''
        Test if get all courses returns a non empty array of results
        '''
        result = self.get_query({
        })
        assert len(result) != 0

if __name__ == "__main__":
    unittest.main()
