import React from 'react';
import MeetingInfoList from "./MeetingInfoList";
import "../css/CourseInfo.css"

class CourseInfo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            course: props.course
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.course !== state.course) {
            return {
                course: props.course
            };
        }
        return null;
    }

    render() {
        let course = this.state.course;
        if (course !== null) {
            let section = course.sections[0];
            return (
                <div className="courseInfo">
                    <h2>{`${course.code} (${section.code}) ${section.name}`}</h2>
                    <div className="sectionDetails">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="fieldLabel">Term:</td>
                                    <td>{section.term}</td>
                                </tr>
                                <tr>
                                    <td className="fieldLabel">Instructors:</td>
                                    <td>{section.teachers.join(", ")}</td>
                                </tr>
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
                </div>
            );
        }
    }
}

export default CourseInfo;
