import React from 'react';
import "../css/ScheduleHelper.css";
import CourseList from './CourseList.js';
import FormCheck from 'react-bootstrap/FormCheck';
import axios from 'axios';

class ScheduleHelper extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            courses: props.courses,
            suggest: [],
            term: props.term,
            algorithm: null,
            start: false,
            ignore: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.term !== state.term) {
            return {
                term: props.term,
                suggest: []
            };
        }
        if (props.courses !== state.courses) {
            return {
                courses: props.courses,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (this.state.start === true) {
            this.setState({
                start: false
            });
            this.getCourse();
        }
    }

    render() {
    	return(
    		<div className="scheduleHelper">
                <h2>Schedule Helper</h2>
                <div className="scheduleActions">
                    <div className="options scheduleAction">
                        <h3>Options</h3>
                        <FormCheck
                            label="Hide courses without meetings"
                            onClick={() => this.toggleBox()}
                        />
                    </div>
                    <div className="algorithms scheduleAction">
                        <h3>Suggestion Type</h3>
                        <FormCheck
                            name="algorithm"
                            type="radio"
                            label="No Tuesday or Thursday"
                            onClick={() => this.performNoTuesThurs()}
                        />
                        <FormCheck
                            name="algorithm"
                            type="radio"
                            label="No Fridays"
                            onClick={() => this.performNoFriday()}
                        />
                        <FormCheck
                            name="algorithm"
                            type="radio"
                            label="No Mornings"
                            onClick={() => this.performNoMornings()}
                        />
                        <FormCheck
                            name="algorithm"
                            type="radio"
                            label="No Evenings"
                            onClick={() => this.performNoEvenings()}
                        />
                    </div>
                </div>
                {this.renderCourseList()}
    		</div>
    	);
    }

    renderCourseList() {
        let suggest = this.state.suggest;
        let algorithm = this.state.algorithm;

        if (suggest.length > 0) {
            return (
                <div className="suggestList">
                    <h3>Recommended Courses</h3>
                    <CourseList
                        buttonVariant="primary"
                        buttonText="Add"
                        buttonCallback={this.props.buttonCallback}
                        errorText=""
                        courses={this.state.suggest}
                        term={this.state.term}
                        courseClickCallback={this.props.courseClickCallback}
                    />
                </div>
            );
        }
        else if (suggest.length === 0 && algorithm !== null) {
            return (
                <div className="suggestList">
                    <h3>Recommended Courses</h3>
                    <h5>Schedule is full.</h5>
                </div>
            );
        }
        else {
            return (null);
        }
    }

    toggleBox() {
        if(this.state.ignore) {
            this.setState({
                ignore: false
            });
        } else {
            this.setState({
                ignore: true
            });
        }
    }

    getCourse() {
        let basicCourses = [];
        for(let i = 0; i < this.state.courses.length; i++) {
            let basic = this.state.courses[i].code.slice() + ":"
            + this.state.courses[i].sections[0].code.slice() + ":"
            + this.state.courses[i].sections[0].term.slice();
            if(this.state.term === this.state.courses[i].sections[0].term) {
                basicCourses.push(basic);
            }
        }
        axios.get("/randomCourse", {
            headers: {},
            params: {
                term: this.state.term,
                algorithm: this.state.algorithm,
                courses: basicCourses,
                ignoreTBA: this.state.ignore
            }
        }).then((resp) => {
            this.setState({
                suggest: resp.data,
            });
        })
        .catch((err) => {
            this.setState({
                courseSelected: null,
            });
        });
    }

    performNoTuesThurs() {
        this.setState({
            algorithm: "NoTuesThurs",
            suggest: [],
            start: true
        });
    }

    performNoFriday() {
        this.setState({
            algorithm: "NoFriday",
            suggest: [],
            start: true
        });
    }

    performNoMornings() {
        this.setState({
            algorithm: "NoMornings",
            suggest: [],
            start: true
        });
    }

    performNoEvenings() {
        this.setState({
            algorithm: "NoEvenings",
            suggest: [],
            start: true
        });
    }
}

export default ScheduleHelper;
