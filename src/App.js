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
import CourseList from "./Components/CourseList";
import CourseSearch from "./Components/CourseSearch";

function App() {
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
          <CourseList />
          <CourseSearch />
        </div>
      </div>
    </div>
  );
}

export default App;
