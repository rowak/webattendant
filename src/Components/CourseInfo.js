import React from 'react';
import CourseInfoList from "./CourseInfoList";
import "../css/CourseInfo.css"

class CourseInfo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {courses: props.courses, term: props.term};
        console.log("Test state: ");
        console.log(this.state);
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
                <h2>Course Information</h2>
                <CourseInfoList
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

export default CourseInfo;

