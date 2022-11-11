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

    def test_search_course_name_returns_valid_courses(self):
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

if __name__ == "__main__":
    unittest.main()
