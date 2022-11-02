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
import Calendar from "./Components/Calendar.js";
import CourseInput from "./Components/CourseInput";
import ScheduledCoursesList from "./Components/ScheduledCoursesList";
import CourseSearch from "./Components/CourseSearch";

function App() {
  // let courses = [{"code": "CIS*3760", "sections": [{"code": "0101"}]}];
  let courses = [];
  return (
    <div className="App">
      <header className="App-header">
        <h1>Team 201</h1>
      </header>
      <CourseInput />
      <div className="app-content">
        <div className="calendar-wrap">
          <Calendar />
        </div>
        <div className="app-sidebar">
          <ScheduledCoursesList courses={courses} />
          <CourseSearch courses={courses} />
        </div>
      </div>
    </div>
  );
}

export default App;
