/* Unused logo from default React installation
import logo from "./logo.svg";
*/
import "./css/App.css";
import './css/bootstrap.min.css';
import './css/dashboard.css';
/*
Potentially useful library. Installed already by install.sh
import DatalistInput from "react-datalist-input";
*/
import React from 'react';
import Calendar from "./Components/Calendar.js";
import ScheduledCoursesList from "./Components/ScheduledCoursesList";
import CourseSearch from "./Components/CourseSearch";
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  renderCalendar() {
    return (
        <Calendar courses={this.state.courses}/>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Team 201</h1>
        </header>
        <div className="app-content">
          <div className="calendar-wrap">
            {this.renderCalendar()}
          </div>
          <div className="app-sidebar">
            <CourseSearch courses={this.state.courses} buttonCallback={this.addCourseButtonCallback} />
            <ScheduledCoursesList courses={this.state.courses} buttonCallback={this.removeCourseButtonCallback} />
          </div>
          <Button onClick={(e) => {
            let event = {
    "code": "CIS*3210",
    "sections": [{
        "academicLevel": "Undergraduate",
        "availableCapacity": 0,
        "capacity": 95,
        "code": "0101",
        "credits": 0.5,
        "id": "7254",
        "location": "Guelph",
        "meetings": [{
            "date": null,
            "daysOfWeek": ["Mon", "Wed", "Fri"],
            "endTime": "11:20AM",
            "roomInfo": {
                "building": "AD-S",
                "roomNumber": "VIRTUAL (more)..."
            },
            "startTime": "10:30AM",
            "type": "LEC"
        },{
            "date": null,
            "daysOfWeek": ["Mon", "Wed", "Fri"],
            "endTime": "11:20AM",
            "roomInfo": {
                "building": "AD-S",
                "roomNumber": "VIRTUAL (more)..."
            },
            "startTime": "10:30AM",
            "type": "LAB"
        }],
        "name": "Computer Networks",
        "status": "Closed",
        "teachers": ["TBA  TBA"],
        "term": "Fall 2022"
    }]
};
                    this.addCourseButtonCallback(event);
          }}>test
          </Button>
        </div>
      </div>
    );
  }

  // Function to translate a list of days into an array of numbers
  translateDays = (days) => {
    let array = [];
    for(let i = 0; i < days.length; i++) {
      if(days[i].toLowerCase() === "mon") {
        array.push(1);
      } else if(days[i].toLowerCase() === "tues") {
        array.push(2);
      } else if(days[i].toLowerCase() === "wed") {
        array.push(3);
      } else if(days[i].toLowerCase() === "thurs") {
        array.push(4);
      } else if(days[i].toLowerCase() === "fri") {
        array.push(5);
      } else if(days[i].toLowerCase() === "sat") {
        array.push(6);
      } else {
        array.push(0);
      }
    }
    return array;
  }

  // Callback that executes when the "Add" button in the
  // CourseSearch component is clicked.
  addCourseButtonCallback = (course) => {
    console.log("addCourseButtonCallback called");
    let courses = this.state.courses;
    if (courses.length === 5) {
        console.log("SCHEDULE IS FULL");
        // TODO: notify user
    }
    if (!this.hasCourse(courses, course)) {
        console.log(course);
        for(let i = 0; i < course.sections.length; i++) {
          let sec = course.sections[i];

          for(let j = 0; j < sec.meetings.length; j++) {
            let meet = sec.meetings[j];
            // A more event friendly format
            let newEvent = {
              title: sec.name, 
              code: course.code,
              startTime: meet.startTime,
              endTime: meet.endTime,
              daysOfWeek: this.translateDays(meet.daysOfWeek),
              sectioncode: sec.code
            };
            courses.push(newEvent);
          }
        }
    }
    this.setState({
        courses: courses
    });
    console.log(this.state.courses);
  }

  // Callback that executes when the "Remove" button in the
  // ScheduledCoursesList component is clicked.
  removeCourseButtonCallback = (course) => {
    let courses = this.state.courses;
    while (this.hasCourse(courses, course)) {
      let idx = courses.indexOf(course);
      courses.splice(idx, 1);
    }
    this.setState({
      courses: courses
    });
  }

  hasCourse(courses, course) {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].code === course.code) {
        return true;
      }
    }
    return false;
  }
}

export default App;
