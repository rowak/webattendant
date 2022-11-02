import React from 'react';
import Button from 'react-bootstrap/Button';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../css/CourseList.css';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: props.courses};
    }

    static getDerivedStateFromProps(props, state) {
        if (props.courses !== state.courses) {
            return {
                courses: props.courses
            };
        }
        return null;
    }

    render() {
        if (this.state.courses.length === 0) {
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
                        return (
                        <ListGroup key={i}>
                            <ListGroupItem className="courseListItem ms-0">
                                <div>
                                    <h5>{course.code} ({course.sections[0].code})</h5>
                                    <p>{course.sections[0].name}</p>
                                </div>
                                <Button variant={this.props.buttonVariant} onClick={() => this.props.buttonCallback(course)}>{this.props.buttonText}</Button>
                            </ListGroupItem>
                        </ListGroup>
                        );
                    })}
                </div>
            );
        }
    }
}

export default CourseList;
