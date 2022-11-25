import React from 'react';
import Button from 'react-bootstrap/Button';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../css/CourseList.css';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: props.courses,
            term: props.term
        };
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
                        let itemClass = "courseListItem ms-0";
                        if (this.props.borderColors) {
                            borderColor = course.color;
                        }
                        if (course.sections[0].status === "Closed") {
                            itemClass += " closedItem";
                        }
                        if (this.props.term === course.sections[0].term) {
                            return (
                            <ListGroup key={i} className="courseListGroup">
                                <ListGroupItem onClick={(e) => this.props.courseClickCallback(course)} className={itemClass} style={{borderColor: borderColor}}>
                                    <div>
                                        <div>
                                            <h5 className="courseCode">{course.code} ({course.sections[0].code})</h5>
                                            {this.renderNoMeetingsTag(course)}
                                            {this.renderNoExamsTag(course)}
                                        </div>
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

    hasMeetingsWithTimes(course) {
        let meetings = course.sections[0].meetings;
        if (meetings !== undefined) {
            for (let i = 0; i < meetings.length; i++) {
                if (meetings[i].daysOfWeek !== null && meetings[i].startTime !== null && meetings[i].endTime !== null) {
                    return true;
                }
            }
        }
        return false;
    }

    hasExam(course) {
        let meetings = course.sections[0].meetings;
        if (meetings !== undefined) {
            for (let i = 0; i < meetings.length; i++) {
                if (meetings[i].type.toLowerCase() === "exam") {
                    return true;
                }
            }
        }
        return false;
    }

    renderNoMeetingsTag(course) {
        if (!this.hasMeetingsWithTimes(course)) {
            return this.renderTag("No Meetings", "noMeetings");
        }
        else {
            return (null);
        }
    }

    renderNoExamsTag(course) {
        if (!this.hasExam(course)) {
            return this.renderTag("No Exam", "noExam");
        }
        else {
            return (null);
        }
    }

    renderTag(text, type) {
        let className = "tag " + type;
        return (
            <div className={className}>
                {text}
            </div>
        );
    }

    renderButton(course) {
        if (course.sections[0].status === "Open") {
            return (
                <Button variant={this.props.buttonVariant} onClick={(e) => this.handleButtonCallback(e, course)}>{this.props.buttonText}</Button>
            );
        }
        else {
            return (
                <Button variant={this.props.buttonVariant} onClick={(e) => this.props.handleButtonCallback(e, course)} disabled>{this.props.buttonText}</Button>
            );
        }
    }

    handleButtonCallback = (e, course) => {
        e.stopPropagation();
        this.props.buttonCallback(course);
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
