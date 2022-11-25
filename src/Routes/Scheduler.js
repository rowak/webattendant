import React from "react";
import ScheduledCoursesList from "../Components/ScheduledCoursesList";
import CourseSearch from "../Components/CourseSearch";
import ScheduleHelper from "../Components/ScheduleHelper";
import CourseInfo from "../Components/CourseInfo";
import AppHeader from "../Components/AppHeader";
import Calendar from "../Components/Calendar.js";

import moment from 'moment';
import Alert from 'react-bootstrap/Alert';

class Scheduler extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            fullError: false,
            conflictError: false,
            termSelectors: ["Fall 2022", "Winter 2023"],
            term: "Fall 2022",
            selectedCourse: null
        };
    }

    // variables
    colors = ['#C09BD8', '#F5B400', '#8AC926', '#1982C4', '#6A4C93'];
    // Used colors are stored in an object like {"code": "CIS*3760", "term": "Fall 2022"}.
    // Each position in the usedColors array represents a color (in order) in the colors array.
    // Each color can be assigned to only one course at a time, but the same color can be
    // assigned to courses in other terms.
    usedColors = [[], [], [], [], []];

    render() {
        return (
            <div className="Scheduler">
                <CourseInfo
                    course={this.state.selectedCourse}
                    hideModalCallback={this.hideModalCallback} />
                <AppHeader term={this.state.term} />
                <div className="app-content">
                    <div className="calendar-wrap">
                        {this.renderCalendar()}
                    </div>
                    <div className="app-sidebar">
                        <CourseSearch
                            courses={[]}
                            buttonCallback={this.addCourseButtonCallback}
                            term={this.state.term}
                            courseClickCallback={this.courseClickCallback}
                        />
                        <ScheduledCoursesList
                            courses={this.state.courses}
                            buttonCallback={this.removeCourseButtonCallback}
                            term={this.state.term}
                            courseClickCallback={this.courseClickCallback}
                        />
                        <ScheduleHelper
                            term={this.state.term}
                            courses={this.state.courses}
                            buttonCallback={this.addCourseButtonCallback}
                            courseClickCallback={this.courseClickCallback}
                        />
                    </div>
                    <div className="error-notifications">
                        {this.renderFullAlert()}
                        {this.renderConflictAlert()}
                    </div>
                </div>
            </div>
        );
    }

    renderCalendar() {
        return (
            <Calendar
                courses={this.state.courses}
                termSelectors={this.state.termSelectors}
                termSelectorCallback={this.changeTermButtonCallback}
                term={this.state.term}
            />
        )
    }

    renderFullAlert = () => {
        return (
            <Alert
                key='warning'
                variant='warning'
                show={this.state.fullError}
                onClose={() => this.setState({ fullError: false })} dismissible>
                <Alert.Heading>Full Schedule</Alert.Heading>
                <p>You can only have up to 5 courses selected at once.</p>
            </Alert>
        );
    }

    renderConflictAlert = () => {
        return (
            <Alert
                key='danger'
                variant='danger'
                show={this.state.conflictError}
                onClose={() => this.setState({ conflictError: false })} dismissible>
                <Alert.Heading>Conflict</Alert.Heading>
                <p>You cannot add a course that is already in your schedule.</p>
            </Alert>
        );
    }

    showFullAlert = () => {
        this.setState({ fullError: true }, () => {
            window.setTimeout(() => {
                this.setState({ fullError: false })
            }, 4000);
        });
    }

    showConflictAlert = () => {
        this.setState({ conflictError: true }, () => {
            window.setTimeout(() => {
                this.setState({ conflictError: false })
            }, 4000);
        })
    }

    // Function to translate a list of days into an array of numbers
    translateDays = (days) => {
        let array = [];
        if (days != null) {
            for (let i = 0; i < days.length; i++) {
                if (days[i].toLowerCase() === "mon") {
                    array.push(1);
                } else if (days[i].toLowerCase() === "tues") {
                    array.push(2);
                } else if (days[i].toLowerCase() === "wed") {
                    array.push(3);
                } else if (days[i].toLowerCase() === "thur") {
                    array.push(4);
                } else if (days[i].toLowerCase() === "fri") {
                    array.push(5);
                } else if (days[i].toLowerCase() === "sat") {
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
        console.log(this.usedColors);
        let courseObj = { "code": courseCode, "term": this.state.term };
        for (let i = 0; i < this.colors.length; i++) {
            if (this.colorHasTerm(this.usedColors[i], courseObj.term) === -1) {
                this.usedColors[i].push(courseObj);
                return this.colors[i]
            }
        }
        return null;
    }

    colorHasTerm = (color, term) => {
        for (let i = 0; i < color.length; i++) {
            if (color[i].term === term) {
                return i;
            }
        }
        return -1;
    }

    colorHasTermAndCourse = (color, code, term) => {
        for (let i = 0; i < color.length; i++) {
            if (color[i].code === code && color[i].term === term) {
                return i;
            }
        }
        return -1;
    }

    // Frees the color used by a course so it can be used
    // by other courses.
    freeColor = (courseCode) => {
        console.log(this.usedColors);
        let courseObj = { "code": courseCode, "term": this.state.term };
        for (let i = 0; i < this.colors.length; i++) {
            let has = this.colorHasTermAndCourse(this.usedColors[i], courseObj.code, courseObj.term);
            if (has !== -1) {
                this.usedColors[i].splice(this.colorHasTerm(this.usedColors[i], courseObj.term), 1);
                break;
            }
        }
    }

    checkMaxCoursesInTerm = () => {
        let numCourses = 0;
        for (let i = 0; i < this.state.courses.length; i++) {
            let course = this.state.courses[i];
            if (course.sections[0].term === this.state.term) {
                numCourses++;
            }
        }
        return numCourses < 5;
    }

    // Callback that executes when the "Add" button in the
    // CourseSearch component is clicked.
    addCourseButtonCallback = (course) => {
        let courses = this.state.courses;
        if (!this.checkMaxCoursesInTerm()) {
            this.showFullAlert();
            return;
        }
        if (!this.hasCourse(courses, course)) {
            let color = this.getNextColor(course.code);
            // Add new field to course for events
            course.events = [];
            if ('sections' in course) {
                for (let i = 0; i < course.sections.length; i++) {
                    let sec = course.sections[i];
                    if ('meetings' in sec) {
                        for (let j = 0; j < sec.meetings.length; j++) {
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
                            if (meet.type.toLowerCase() !== "exam") {
                                course.events.push(newEvent);
                            }
                        }
                    }
                }
            }
            course.color = color;
            courses.push(course);
        } else {
            this.showConflictAlert();
        }
        this.setState({
            courses: courses
        });
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

    // Callback that executes when one of the term selector buttons
    // in the Calendar component is clicked.
    changeTermButtonCallback = (term) => {
        this.setState({
            term: term
        });
    }

    // Callback that executes when a course in a course list is clicked.
    courseClickCallback = (course) => {
        this.setState({
            selectedCourse: course
        });
    }

    hideModalCallback = () => {
        this.setState({
            selectedCourse: null
        })
    }

    hasCourse(courses, course) {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].code === course.code && courses[i].sections[0].term === this.state.term) {
                return true;
            }
        }
        return false;
    }
}

export default Scheduler;
