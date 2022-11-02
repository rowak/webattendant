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
        </div>
      </div>
    );
  }

  // Callback that executes when the "Add" button in the
  // CourseSearch component is clicked.
  addCourseButtonCallback = (course) => {
    console.log("addCourseButtonCallback called");
    let courses = this.state.courses;
    if (courses.length == 5) {
        console.log("SCHEDULE IS FULL");
        // TODO: notify user
    }
    if (!this.hasCourse(courses, course)) {
        courses.push(course);
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
    if (this.hasCourse(courses, course)) {
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
