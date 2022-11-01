import React from 'react';
import Button from 'react-bootstrap/Button';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../css/CourseList.css';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: [{"code": "CIS*3760", "sections": [{"code": "0101"}]}]};
    }

    render() {
        return (
            <div className="courseList">
                <h2>Courses</h2>
                {this.getCourses()}
            </div>
        );
    }

    addCourse(course) {
        this.state.push(course);
    }

    removeCourse(course) {
        let courses = this.state.courses;
        let idx = courses.indexOf(course);
        if (idx != -1) {
            courses.splice(idx, 1);
        }
    }

    getCourses() {
        if (this.state.courses.length === 0) {
            return <h5 className="errorText">No courses added yet!</h5>;
        }
        else {
            return (
                <React.Fragment>
                {this.state.courses.map(course => {
                    return (
                    <ListGroup>
                        <ListGroupItem className="courseListItem ms-0">
                            <div>
                                <h5>{course.code} ({course.sections[0].code})</h5>
                                <p>Test</p>
                            </div>
                            <Button variant="danger">Remove</Button>
                        </ListGroupItem>
                    </ListGroup>
                    );
                })}
                </React.Fragment>
            );
        }
    }
}

export default CourseList;
