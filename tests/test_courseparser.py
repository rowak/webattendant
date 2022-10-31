import unittest
from src.parser import ParseData

class TestCourseParser(unittest.TestCase):
    def setUp(self):
        self.parser = ParseData()

    def test_parse_meeting_info_parses_normal_lecture_lab_exam(self):
        meetingInfoInput = [
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
        meetingInfoExpected = [
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
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoInput)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")
    
    def test_parse_meeting_info_parses_TBA_days_TBA_times_TBA_room(self):
        meetingInfoInput = [
            "LEC Days TBA",
            "Times TBA",
            "Room TBA"
        ]
        meetingInfoExpected = [
            {
                "type": "LEC", "daysOfWeek": None,
                "startTime": None, "endTime": None, "date": None,
                "roomInfo": {
                    "building": None,
                    "roomNumber": "TBA"
                }
            }
        ]
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoInput)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")

    def test_parse_meeting_info_parses_virtual_room(self):
        meetingInfoInput = [
            "LEC Mon, Wed",
            "2:00PM - 3:00PM",
            "AD-S", 
            ", Room VIRTUAL"
        ]
        meetingInfoExpected = [
            {
                "type": "LEC", "daysOfWeek": ["Mon", "Wed"],
                "startTime": "2:00PM", "endTime": "3:00PM", "date": None,
                "roomInfo": {
                    "building": "AD-S",
                    "roomNumber": "VIRTUAL"
                }
            }
        ]
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoInput)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")
    
    def test_parse_meeting_info_parses_exam(self):
        meetingInfoInput = [
            "LEC Mon, Wed",
            "2:00PM - 3:00PM",
            "AD-S", 
            ", Room VIRTUAL",
            
            "EXAM Fri",
            "5:00PM - 7:00PM (2022/09/16)",
            "MACN",
            ", Room 113"
        ]
        meetingInfoExpected = [
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
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoInput)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")

    def test_parse_meeting_info_parses_DE(self):
        meetingInfoInput = [
            "Distance Education Days TBA",
            "Times TBA",
            "Room TBA",
            
            "EXAM Fri",
            "5:00PM - 7:00PM (2022/09/16)",
            "Room TBA"
        ]
        meetingInfoExpected = [
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
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoInput)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")
      
if __name__ == "__main__":
    unittest.main()