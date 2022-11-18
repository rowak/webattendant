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
                                    <h6>CIS*3760 Software Engineering</h6>
                                    <div>
                                        <br></br>
                                        <br></br>
                                        <p>Credits: 0.50</p>
                                        <p>Grading: Graded</p>
                                        <p>Instructor: Greg Klotz</p>
                                        <p>Term : Fall 2022</p>
                                    </div>
                                    <div>
                                        <br></br>
                                        <p>Time: 10:00 - 11:00</p>
                                        <p>Date: 10/11/2000</p>
                                        <p>Location: MACN 100 EXAM</p>
                                        <p>Time: 10:00 - 11:00</p>
                                        <p>Location: MACN 100 LEC</p>
                                        <p>Time: 10:00 - 11:00</p>
                                        <p>Location: MACN 100 LAB</p>
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


