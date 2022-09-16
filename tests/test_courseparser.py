import unittest
from src.parser import ParseData

class TestCourseParser(unittest.TestCase):
    def setUp(self):
        self.parser = ParseData()

    def test_parse_meeting_info_parses_normal_lecture_lab_exam(self):
        meetingInfoArr = [
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
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoArr)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")
    
    def test_parse_meeting_info_parses_TBA_days_TBA_times_TBA_room(self):
        meetingInfoArr = [
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
        meetingInfoResult = self.parser.parse_meeting_info(meetingInfoArr)
        self.assertEqual(meetingInfoResult, meetingInfoExpected, "MeetingInfo objects do not match.")

if __name__ == "__main__":
    unittest.main()