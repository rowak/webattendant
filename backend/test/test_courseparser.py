"""This module tests classes in the courseparser module."""
import unittest
from courseparser import ParseData

class TestCourseParser(unittest.TestCase):
    """This class tests methods in the ParseData class."""
    def setUp(self):
        self.parser = ParseData()

    def test_parse_meeting_info_parses_normal_lecture_lab_exam(self):
        """Test if parse_meeting_info parses a normal meeting with a lecture, lab, and exam"""
        meeting_info_input = [
            "LEC Mon, Wed, Fri",
            "11:00AM - 11:50AM",
            "ROZH",
            ", Room 101",

            "LAB Tues",
            "2:00PM - 3:00PM",
            "MCLN",
            ", Room 208",

            "EXAM Fri",
            "5:00PM - 7:00PM (2022/09/16)",
            "MACN",
            ", Room 113"
        ]
        meeting_info_expected = [
            {
                "type": "LEC", "daysOfWeek": ["Mon", "Wed", "Fri"],
                "startTime": "11:00AM", "endTime": "11:50AM", "date": None,
                "roomInfo": {
                    "building": "ROZH",
                    "roomNumber": "101"
                }
            },
            {
                "type": "LAB", "daysOfWeek": ["Tues"],
                "startTime": "2:00PM", "endTime": "3:00PM", "date": None,
                "roomInfo": {
                    "building": "MCLN",
                    "roomNumber": "208"
                }
            },
            {
                "type": "EXAM", "daysOfWeek": ["Fri"],
                "startTime": "5:00PM", "endTime": "7:00PM", "date": "2022/09/16",
                "roomInfo": {
                    "building": "MACN",
                    "roomNumber": "113"
                }
            }
        ]
        meeting_info_result = self.parser.parse_meeting_info(meeting_info_input)
        self.assertEqual(meeting_info_result, meeting_info_expected, \
                "MeetingInfo objects do not match.")

    def test_parse_meeting_info_parses_tba_days_tba_times_tba_room(self):
        """Test if parse_meeting_info parses a meeting with TBA days, TBA times, and a TBA room."""
        meeting_info_input = [
            "LEC Days TBA",
            "Times TBA",
            "Room TBA"
        ]
        meeting_info_expected = [
            {
                "type": "LEC", "daysOfWeek": None,
                "startTime": None, "endTime": None, "date": None,
                "roomInfo": {
                    "building": None,
                    "roomNumber": "TBA"
                }
            }
        ]
        meeting_info_result = self.parser.parse_meeting_info(meeting_info_input)
        self.assertEqual(meeting_info_result, meeting_info_expected, \
                "MeetingInfo objects do not match.")

    def test_parse_meeting_info_parses_virtual_room(self):
        """Test if parse_meeting_info parses a meeting with a virtual room."""
        meeting_info_input = [
            "LEC Mon, Wed",
            "2:00PM - 3:00PM",
            "AD-S",
            ", Room VIRTUAL"
        ]
        meeting_info_expected = [
            {
                "type": "LEC", "daysOfWeek": ["Mon", "Wed"],
                "startTime": "2:00PM", "endTime": "3:00PM", "date": None,
                "roomInfo": {
                    "building": "AD-S",
                    "roomNumber": "VIRTUAL"
                }
            }
        ]
        meeting_info_result = self.parser.parse_meeting_info(meeting_info_input)
        self.assertEqual(meeting_info_result, meeting_info_expected, \
                "MeetingInfo objects do not match.")

    def test_parse_meeting_info_parses_exam(self):
        """Test if parse_meeting_info parses a meeting with an exam."""
        meeting_info_input = [
            "LEC Mon, Wed",
            "2:00PM - 3:00PM",
            "AD-S",
            ", Room VIRTUAL",

            "EXAM Fri",
            "5:00PM - 7:00PM (2022/09/16)",
            "MACN",
            ", Room 113"
        ]
        meeting_info_expected = [
            {
                "type": "LEC", "daysOfWeek": ["Mon", "Wed"],
                "startTime": "2:00PM", "endTime": "3:00PM", "date": None,
                "roomInfo": {
                    "building": "AD-S",
                    "roomNumber": "VIRTUAL"
                }
            },
            {
                "type": "EXAM", "daysOfWeek": ["Fri"],
                "startTime": "5:00PM", "endTime": "7:00PM", "date": "2022/09/16",
                "roomInfo": {
                    "building": "MACN",
                    "roomNumber": "113"
                }
            }
        ]
        meeting_info_result = self.parser.parse_meeting_info(meeting_info_input)
        self.assertEqual(meeting_info_result, meeting_info_expected, \
                "MeetingInfo objects do not match.")

    def test_parse_meeting_info_parses_de(self):
        """Test if parse_meeting_info parses a distance education meeting."""
        meeting_info_input = [
            "Distance Education Days TBA",
            "Times TBA",
            "Room TBA",

            "EXAM Fri",
            "5:00PM - 7:00PM (2022/09/16)",
            "Room TBA"
        ]
        meeting_info_expected = [
            {
                "type": "Distance Education", "daysOfWeek": None,
                "startTime": None, "endTime": None, "date": None,
                "roomInfo": {
                    "building": None,
                    "roomNumber": "TBA"
                }
            },
            {
                "type": "EXAM", "daysOfWeek": ["Fri"],
                "startTime": "5:00PM", "endTime": "7:00PM", "date": "2022/09/16",
                "roomInfo": {
                    "building": None,
                    "roomNumber": "TBA"
                }
            }
        ]
        meeting_info_result = self.parser.parse_meeting_info(meeting_info_input)
        self.assertEqual(meeting_info_result, meeting_info_expected, \
                "MeetingInfo objects do not match.")

if __name__ == "__main__":
    unittest.main()
