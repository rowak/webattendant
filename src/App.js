import logo from "./logo.svg";
import "./App.css";
import DatalistInput from "react-datalist-input";
import Calendar from "./calendar.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>CourseLoader</h2>
        <div>
          <h5>Courses</h5>

          <input
            type="text"
            id="default"
            list="courses"
            placeholder="e.g. CIS*1500"
            STYLE="color:Red"
          ></input>

          <datalist id="courses">
            <option value="CIS*1500"></option>
          </datalist>

          <input type="text" placeholder="e.g. 0101" STYLE="color:Red"></input>

          <br></br>

          <input
            type="text"
            id="default"
            list="courses"
            placeholder="e.g. CIS*1500"
            STYLE="color:Blue"
          ></input>

          <datalist id="courses">
            <option value="CIS*1500"></option>
          </datalist>

          <input type="text" placeholder="e.g. 0101" STYLE="color:Blue"></input>

          <br></br>

          <input
            type="text"
            id="default"
            list="courses"
            placeholder="e.g. CIS*1500"
            STYLE="color:Green"
          ></input>

          <datalist id="courses">
            <option value="CIS*1500"></option>
          </datalist>

          <input
            type="text"
            placeholder="e.g. 0101"
            STYLE="color:Green"
          ></input>

          <br></br>

          <input
            type="text"
            id="default"
            list="courses"
            placeholder="e.g. CIS*1500"
            STYLE="color:Purple"
          ></input>

          <datalist id="courses">
            <option value="CIS*1500"></option>
          </datalist>

          <input
            type="text"
            placeholder="e.g. 0101"
            STYLE="color:purple"
          ></input>

          <br></br>

          <input
            type="text"
            id="default"
            list="courses"
            placeholder="e.g. CIS*1500"
            STYLE="color:Orange"
          ></input>

          <datalist id="courses">
            <option value="CIS*1500"></option>
          </datalist>

          <input
            type="text"
            placeholder="e.g. 0101"
            STYLE="color:Orange"
          ></input>

          <br></br>

          <input
            type="checkbox"
            id="ExamCheck"
            name="ExamCheck"
            value="check"
          ></input>

          <label for="ExamCheck">Show Exams?</label>

          <br></br>
        </div>
        <div class="parent">
          <div class="child">
            <h6>Schedule Helper</h6>

            <input
              type="radio"
              id="lowest_day"
              name="helper"
              value="Lowest Day"
            ></input>

            <label for="lowest_day">Lowest Day</label>

            <br></br>

            <input
              type="radio"
              id="no_tuesday_thursdays"
              name="helper"
              value="No Tuesdays and Thursdays"
            ></input>

            <label for="no_tuesday_thursdays">No Tuesdays and Thursdays</label>

            <br></br>

            <input
              type="radio"
              id="no_evenings"
              name="helper"
              value="No Evenings"
            ></input>

            <label for="no_evenings">No Evenings</label>

            <br></br>

            <input
              type="radio"
              id="no_early_mornings"
              name="helper"
              value="No early Mornings"
            ></input>

            <label for="No early Mornings">No early Mornings</label>

            <br></br>

            <input
              type="radio"
              id="no_fridays"
              name="helper"
              value="No Fridays"
            ></input>

            <label for="No Fridays">No Fridays</label>

            <br></br>
          </div>

          <div class="child">
            <h6>Suggested Courses</h6>

            <input
              type="text"
              id="lowest_day"
              name="helper"
              placeholder="Lowest Day"
            ></input>

            <br></br>

            <input
              type="text"
              id="no_tuesday_thursdays"
              name="helper"
              placeholder="No Tuesdays and Thursdays"
            ></input>

            <br></br>

            <input
              type="text"
              id="no_evenings"
              name="helper"
              placeholder="No Evenings"
            ></input>

            <br></br>

            <input
              type="text"
              id="no_early_mornings"
              name="helper"
              placeholder="No early Mornings"
            ></input>

            <br></br>

            <input
              type="text"
              id="no_fridays"
              name="helper"
              placeholder="No Fridays"
            ></input>

            <br></br>
          </div>
        </div>
        <button type="button">Apply</button>

        <Calendar />
      </header>
    </div>
  );
}

export default App;
