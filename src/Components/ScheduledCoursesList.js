import React from 'react';
import CourseList from "./CourseList";
import '../css/ScheduledCoursesList.css';

class ScheduledCourseList extends React.Component {
    constructor(props) {
        super(props);
        this.courseList = <CourseList buttonVariant="danger" buttonText="Remove" errorText="No courses have been added yet!"/>;
    }

    render() {
        return (
            <div className="scheduledCoursesList">
                <h2>Courses</h2>
                {this.courseList}
            </div>
        );
    }

    addCourse(course) {
        this.courseList.addCourse(course);
    }

    removeCourse(course) {
        this.courseList.removeCourse(course);
    }
}

export default ScheduledCourseList;
