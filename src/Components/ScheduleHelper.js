import React from 'react';
import "../css/ScheduleHelper.css";
import Button from "react-bootstrap/Button";
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
        let basicCourses = [];
        for(let i = 0; i < this.state.courses.length; i++) {
            let basic = this.state.courses[i].code + ":"
            + this.state.courses[i].sections[0].code + ":"
            + this.state.courses[i].sections[0].term;
            basicCourses.push(basic);
        }
        for(let i = 0; i < this.state.suggest.length; i++) {
            let basic = this.state.suggest[i].code.slice() + ":"
            + this.state.suggest[i].sections[0].code.slice() + ":"
            + this.state.suggest[i].sections[0].term;
            basicCourses.push(basic);
        }
        axios.get("/randomCourse", {
            headers: {},
            params: {
                term: this.state.term,
                courses: basicCourses
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
                    return(<li>{course["code"]} {course["sections"][0]["code"]}</li>);
                })}
            </ol>
        );
    }
}

export default ScheduleHelper;