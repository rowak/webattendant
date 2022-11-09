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
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      fullError: 0,
      conflictError: 0
    };
  }
  // variables
  colors = ['#C09BD8', '#F5B400', '#8AC926', '#1982C4', '#6A4C93'];
  usedColors = [null, null, null, null, null];

  renderCalendar() {
    return (
        <Calendar courses={this.state.courses}/>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>WebAttendant</h1>
        </header>
        <div className="app-content">
          <div className="calendar-wrap">
            {this.renderCalendar()}
          </div>
          <div className="app-sidebar">
            <CourseSearch courses={this.state.courses} buttonCallback={this.addCourseButtonCallback} />
            <ScheduledCoursesList courses={this.state.courses} buttonCallback={this.removeCourseButtonCallback} />
          </div>
          <div className="error-notifications">
            { this.showFullAlert() }
            { this.showConflictAlert() }
          </div>
        </div>
      </div>
    );
  }

  showFullAlert = () => {
    if(this.state.fullError) {
      return (
        <Alert key='warning' variant='warning'
        onClose={() => this.setState({fullError: 0})} dismissible>
          <Alert.Heading>Full Schedule</Alert.Heading>
          <p>You can only have up to 5 courses selected at once.</p>
        </Alert>
      );
    }
  }

  showConflictAlert = () => {
    if(this.state.conflictError) {
      return (
        <Alert key='danger' variant='danger'
        onClose={() => this.setState({conflictError: 0})} dismissible>
          <Alert.Heading>Conflict</Alert.Heading>
          <p>You cannot add a course that is already in your schedule.</p>
        </Alert>
      );
    }
  }

  // Function to translate a list of days into an array of numbers
  translateDays = (days) => {
    let array = [];
    if(days != null) {
      for(let i = 0; i < days.length; i++) {
        if(days[i].toLowerCase() === "mon") {
          array.push(1);
        } else if(days[i].toLowerCase() === "tues") {
          array.push(2);
        } else if(days[i].toLowerCase() === "wed") {
          array.push(3);
        } else if(days[i].toLowerCase() === "thur") {
          array.push(4);
        } else if(days[i].toLowerCase() === "fri") {
          array.push(5);
        } else if(days[i].toLowerCase() === "sat") {
          array.push(6);
        } else {
          array.push(0);
        }
      }
    }
    return array;
  }

  // Reserves a unique color for a course.
  getNextColor = (courseCode) => {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.usedColors[i] === null) {
        this.usedColors[i] = courseCode;
        return this.colors[i]
      }
    }
    return null;
  }

  // Frees the color used by a course so it can be used
  // by other courses.
  freeColor = (courseCode) => {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.usedColors[i] === courseCode) {
        this.usedColors[i] = null;
      }
    }
  }

  // Callback that executes when the "Add" button in the
  // CourseSearch component is clicked.
  addCourseButtonCallback = (course) => {
    // console.log("addCourseButtonCallback called");
    let courses = this.state.courses;
    if (courses.length === 5) {
        // console.log("SCHEDULE IS FULL");
        // TODO: notify user
        this.setState({fullError: 1});
        return;
    }
    if (!this.hasCourse(courses, course)) {
        let color = this.getNextColor(course.code);
        // Add new field to course for events
        course.events = [];
        if('sections' in course) {
          for(let i = 0; i < course.sections.length; i++) {
            let sec = course.sections[i];
            if('meetings' in sec) {
              for(let j = 0; j < sec.meetings.length; j++) {
                let meet = sec.meetings[j];
                // A more event friendly format
                // Everything in newEvent will be included in the event listing
                // Calendar will use this data for the display
                // Calendar will not have access to course for a specific entry, so
                // make sure each event has everything it needs
                let newEvent = {
                  title: course.code.concat(" ", sec.code.concat(" ", meet.type)),
                  code: course.code,
                  startTime: moment(meet.startTime, ["h:mm A"]).format("HH:mm"),
                  endTime: moment(meet.endTime, ["h:mm A"]).format("HH:mm"),
                  daysOfWeek: this.translateDays(meet.daysOfWeek),
                  sectioncode: sec.code,
                  //set colour based on how many courses are already in the schedule
                  backgroundColor: color,
                  borderColor: color,
                  originalBorderColor: color
                };
                // Basic ignore exams functionality
                if(meet.type.toLowerCase() !== "exam") {
                  course.events.push(newEvent);
                }
              }
            }
          }
        }
      course.color = color;
      courses.push(course);
    } else {
      this.setState({conflictError: 1});
    }
    this.setState({
        courses: courses
    });
    // console.log(this.state.courses);
  }

  // Callback that executes when the "Remove" button in the
  // ScheduledCoursesList component is clicked.
  removeCourseButtonCallback = (course) => {
    let courses = this.state.courses;
    if (this.hasCourse(courses, course)) {
      let idx = courses.indexOf(course);
      courses.splice(idx, 1);
    }
    this.freeColor(course.code);
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
