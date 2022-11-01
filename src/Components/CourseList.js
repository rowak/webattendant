import React from 'react';
import Button from 'react-bootstrap/Button';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../css/CourseList.css';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.buttonVariant = props.buttonVariant;
        this.buttonText = props.buttonText;
        this.errorText = props.errorText;
        this.state = {courses: [{"code": "CIS*3760", "sections": [{"code": "0101"}]}]};
    }

    render() {
        return (
            <div className="courseList">
                {this.getCourses()}
            </div>
        );
    }

    addCourse(course, buttonHandler) {
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
            return <h5 className="errorText">{this.props.errorText}</h5>;
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
                            <Button variant={this.props.buttonVariant}>{this.props.buttonText}</Button>
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
