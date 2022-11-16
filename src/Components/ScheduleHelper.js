import React from 'react';
import "../css/ScheduleHelper.css";
import Button from "react-bootstrap/Button";
import moment from 'moment';
import axios from 'axios';

class ScheduleHelper extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            courses: this.props.courses,
            suggest: [],
            courseSelected: null,
            term: props.term
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.term !== state.term) {
            return {
                courses: props.courses,
                courseSelected: null,
                term: props.term,
                suggest: []
            };
        }
        if (props.courses !== state.courses) {
            return {
                courses: props.courses,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if(this.state.courseSelected !== null) {
            let course = this.state.courseSelected;
            this.setState({ courseSelected: null });
            this.performTranslation(course);
            console.log(course);
            if(this.matchesCriteria(course)) {
                let array = this.state.suggest;
                array.push(course);
            } else {
                this.getCourse();
            }
        }
    }

    render() {
    	return(
    		<div className="courseSearch">
                <h2>Schedule Helper</h2>
                <Button onClick={() => this.getCourse()}>test</Button>
                <p>{this.renderCourse()}</p>
    		</div>
    	);
    }

    // while this function is in app.js, 
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

    performTranslation(course) {
        course.events = [];
        if('sections' in course) {
            for(let i = 0; i < course.sections.length; i++) {
                let sec = course.sections[i];
                if('meetings' in sec) {
                    for(let j = 0; j < sec.meetings.length; j++) {
                        let meet = sec.meetings[j];
                        let newEvent = {
                            title: course.code.concat(" ", sec.code.concat(" ", meet.type)),
                            code: course.code,
                            startTime: moment(meet.startTime, ["h:mm A"]).format("HH:mm"),
                            endTime: moment(meet.endTime, ["h:mm A"]).format("HH:mm"),
                            daysOfWeek: this.translateDays(meet.daysOfWeek),
                            sectioncode: sec.code,
                        };
                        // Basic ignore exams functionality
                        if(meet.type.toLowerCase() !== "exam") {
                            course.events.push(newEvent);
                        }
                    }
                }
            }
        }
    }

    matchesCriteria(course) {
        if(course === null) {
            return true;
        }

        if(this.isNonConflictCourse(course)) {
            return true;
        }

        return false;
    }

    isNonConflictCourse(course) {
        // check all events of course
        for(let i = 0; i < course.events.length; i++) {
            let event = course.events[i];
            if(this.checkCurrentConflict(event) === false && this.checkSuggestConflict(event) === false) {
                return false;
            }
        }
        return true;
    }

    checkCurrentConflict(event) {
        for(let i = 0; i < this.state.courses.length; i++) {
            let events = this.state.courses[i].events;
            for(let j = 0; j < events.length; j++) {
                if (event.startTime < events[j].startTime) {
                    if (event.endTime > events[j].startTime) {
                        return false;
                    }
                }
                else {
                    if (events[j].endTime > event.startTime) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    checkSuggestConflict(event) {
        for(let i = 0; i < this.state.suggest.length; i++) {
            let events = this.state.suggest[i].events;
            for(let j = 0; j < events.length; j++) {
                if (event.startTime < events[j].startTime) {
                    if (event.endTime > events[j].startTime) {
                        return false;
                    }
                }
                else {
                    if (events[j].endTime > event.startTime) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    getCourse() {
        axios.get("/randomCourse", {
            headers: {},
            params: {
                term: this.state.term
            }
        }).then((resp) => {
            this.setState({
                courseSelected: resp.data,
            });
        })
        .catch((err) => {
            this.setState({
                courseSelected: null,
            });
        });
    }

    renderCourse() {
        return (
            <ol>
                {this.state.suggest.map((course, i) => {
                    return(<li>{course["code"]}</li>);
                })}
            </ol>
        );
    }
}

export default ScheduleHelper;