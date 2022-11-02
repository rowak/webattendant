import React from 'react';
import CourseList from "./CourseList";
import '../css/ScheduledCoursesList.css';

class ScheduledCourseList extends React.Component {
    constructor(props) {
        super(props);
        this.courseList = <CourseList buttonVariant="danger" buttonText="Remove" errorText="No courses have been added yet!" courses={props.courses}/>;
    }

    render() {
        return (
            <div className="scheduledCoursesList">
                <h2>Courses</h2>
                {this.courseList}
            </div>
        );
    }
}

export default ScheduledCourseList;
