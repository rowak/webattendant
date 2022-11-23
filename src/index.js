import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import './css/bootstrap.min.css';
import './css/dashboard.css';
import { BrowserRouter } from 'react-router-dom';

// Globally set the base API url for Axios (needed for local development)
let apiURL = process.env.REACT_APP_API_URL;
if (apiURL !== undefined) {
    axios.defaults.baseURL = apiURL;
}

// Globally set the API location for Axios (needed for production).
// For example, if the production URL is https://cis3760-app/ and
// the API location is /api, then the base URL would become
// https://cis3760-app/api/.
let apiLocation = process.env.REACT_APP_API_LOCATION;
if (apiLocation !== undefined) {
    if (apiURL === undefined) {
        apiURL = window.location.href;
    }
    axios.defaults.baseURL = apiURL + apiLocation;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
