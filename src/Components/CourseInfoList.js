import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../css/CourseInfoList.css';

class CourseInfoList extends React.Component {
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
                <div className="courseInfoList">
                    <h5 className="errorText">{this.props.errorText}</h5>
                </div>
            );
        }
        else {
            return (
                <div className="courseInfoList listOverflow">
                    {this.state.courses.map((course, i) => {
                        let borderColor = "transparent";
                        let bgColor = "white";
                        if (this.props.borderColors) {
                            borderColor = course.color;
                        }

                        if (this.props.term === course.sections[0].term) {
                            return (
                            <ListGroup key={i} className="courseInfoListGroup">
                                <ListGroupItem className="courseInfoListItem ms-0" style={{borderColor: borderColor, background: bgColor}}>
                                    <div>
                                        <h6>Course Code: {course.code} ({course.sections[0].code})</h6>
                                        <h6>Term: {course.sections[0].term}</h6>
                                        <h6>Course Name : {course.sections[0].name}</h6>
                                        <h6>Instructor: {course.sections[0].teachers[0]}</h6>
                                        <h6>Exam Day: {course.sections[0].meetings[1].daysOfWeek[0]}</h6>
                                        <h6>Exam Time: {course.sections[0].meetings[1].startTime} - {course.sections[0].meetings[1].endTime}</h6>

                                    </div>
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

export default CourseInfoList;


