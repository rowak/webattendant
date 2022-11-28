import "./css/App.css";
import './css/bootstrap.min.css';
import './css/dashboard.css';
/*
Potentially useful library. Installed already by install.sh
import DatalistInput from "react-datalist-input";
*/
import React from 'react';

import { Routes, Route } from "react-router-dom";
import Landing from "./Routes/Landing";
import Scheduler from "./Routes/Scheduler";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Routes>
            {/* default path is scheduler, can change later*/}
            <Route path="/" element={<Landing />} />
            <Route path="/scheduler" element={<Scheduler />} />
        </Routes>
      </div>
    );
  }

 
}

export default App;
