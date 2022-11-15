import React from 'react';
import CourseList from "./CourseList";
import '../css/ScheduledCoursesList.css';

class ScheduledCourseList extends React.Component {
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
        return (
            <div className="scheduledCoursesList">
                <h2>Courses</h2>
                <CourseList
                    buttonVariant="danger"
                    buttonText="Remove"
                    buttonCallback={this.props.buttonCallback}
                    errorText="No courses have been added yet!"
                    courses={this.state.courses}
                    borderColors={true}
                    term={this.state.term}
                />
            </div>
        );
    }
}

export default ScheduledCourseList;
