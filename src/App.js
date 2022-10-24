/* Unused logo from default React installation
import logo from "./logo.svg";
*/
import "./App.css";
/*
Potentially useful library. Installed already by install.sh
import DatalistInput from "react-datalist-input";
*/
import Calendar from "./Components/Calendar.js";
import CourseInput from "./Components/CourseInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CourseInput/>
        <Calendar />
      </header>
    </div>
  );
}

export default App;
