import React from 'react';
import CourseList from "./CourseList";
import '../css/ScheduledCoursesList.css';

class ScheduledCourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: props.courses
        };
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
        return (
            <div className="scheduledCoursesList">
                <h2>Courses</h2>
                <CourseList buttonVariant="danger" buttonText="Remove" buttonCallback={this.props.buttonCallback} errorText="No courses have been added yet!" courses={this.state.courses}/>
            </div>
        );
    }
}

export default ScheduledCourseList;
