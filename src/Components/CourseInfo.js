import React from 'react';
import MeetingInfoList from "./MeetingInfoList";
import Button from 'react-bootstrap/Button';
import "../css/CourseInfo.css"

class CourseInfo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            course: props.course,
            allCourses: props.allCourses
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.course !== state.course) {
            return {
                course: props.course,
                allCourses: props.allCourses
            };
        }
        return null;
    }

    render() {
        let course = this.state.course;
        if (course !== null) {
            let section = course.sections[0];
            return (
                <div className="info-modal">
                    <div className="modal-shade" onClick={() => this.props.hideModalCallback()}/>
                    <div className="courseInfo">
                        <h2>{`${course.code} (${section.code}) ${section.name}`}</h2>
                        <div className="sectionDetails">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="fieldLabel">Term:</td>
                                        <td>{section.term}</td>
                                    </tr>
                                    { this.getTeachersRow(section) }
                                    <tr>
                                        <td className="fieldLabel">Status:</td>
                                        <td>{`${section.status} (${section.availableCapacity}/${section.capacity})`}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3>Meetings</h3>
                            <MeetingInfoList
                                meetings={section.meetings}
                            />
                        </div>
                        <br></br>
                        {this.renderButton(course)}
                    </div>
                </div>
            );
        }
    }

    renderButton(course) {
        for (let i = 0; i < this.state.allCourses.length; i++) {
            if (course === this.state.allCourses[i]) {
                return (
                    <Button className="infoRemoveButton" variant={this.props.buttonVariant} onClick={(e) => this.handleRemoveButtonCallback(e, course)}>Remove</Button>
                );
            }
        }        
        return (
            <Button className="infoAddButton" variant={this.props.buttonVariant} onClick={(e) => this.handleAddButtonCallback(e, course)}>Add</Button>
        );
    }

    handleAddButtonCallback = (e, course) => {
        e.stopPropagation();
        this.props.addCourseCallBack(course);
    }
    
    handleRemoveButtonCallback = (e, course) => {
        e.stopPropagation();
        this.props.removeCourseCallBack(course);
    }

    getTeachersRow(section) {
        let teachers = "TBA";
        if (section.teachers !== null ) {
            teachers = section.teachers.join(", ");
        }
        if (teachers.indexOf("TBA") !== -1) {
            teachers = "TBA";
        }
        return (
            <tr>
                <td className="fieldLabel">Instructors:</td>
                <td>{teachers}</td>
            </tr>
        );
    }
}

export default CourseInfo;
