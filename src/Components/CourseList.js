import React from 'react';
import Button from 'react-bootstrap/Button';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../css/CourseList.css';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: props.courses, term: props.term};
    }

    static getDerivedStateFromProps(props, state) {
        if (props.courses !== state.courses) {
            return {
                courses: props.courses
            };
        }
        else if (props.term !== state.term) {
            return {
                term: props.term
            }
        }
        return null;
    }

    render() {
        if (this.getNumVisisbleCourses() === 0) {
            return (
                <div className="courseList">
                    <h5 className="errorText">{this.props.errorText}</h5>
                </div>
            );
        }
        else {
            return (
                <div className="courseList listOverflow">
                    {this.state.courses.map((course, i) => {
                        let borderColor = "transparent";
                        let bgColor = "white";
                        if (this.props.borderColors) {
                            borderColor = course.color;
                        }
                        if (course.sections[0].status === "Closed") {
                            bgColor = "#ff8b96";
                        }
                        if (this.props.term === course.sections[0].term) {
                            return (
                            <ListGroup key={i} className="courseListGroup">
                                <ListGroupItem className="courseListItem ms-0" style={{borderColor: borderColor, background: bgColor}}>
                                    <div>
                                        <h5>{course.code} ({course.sections[0].code})</h5>
                                        <p>{course.sections[0].name}</p>
                                    </div>
                                    {this.renderButton(course)}
                                </ListGroupItem>
                            </ListGroup>
                            );
                        }
                        return (null);
                    })}
                </div>
            );
        }
    }

    renderButton(course) {
        if (course.sections[0].status === "Open") {
            return (
                <Button variant={this.props.buttonVariant} onClick={() => this.props.buttonCallback(course)}>{this.props.buttonText}</Button>
            );
        }
        else {
            return (
                <Button variant={this.props.buttonVariant} onClick={() => this.props.buttonCallback(course)} disabled>{this.props.buttonText}</Button>
            );
        }
    }

    getNumVisisbleCourses() {
        let numCourses = 0;
        let courses = this.state.courses;
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].sections[0].term === this.state.term) {
                numCourses++;
            }
        }
        return numCourses;
    }
}

export default CourseList;
