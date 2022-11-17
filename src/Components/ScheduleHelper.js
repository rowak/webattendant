import React from 'react';
import "../css/ScheduleHelper.css";
import Button from "react-bootstrap/Button";
import CourseList from './CourseList.js';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import axios from 'axios';

class ScheduleHelper extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            courses: props.courses,
            suggest: [],
            courseSelected: null,
            term: props.term,
            algorithm: null,
            count: 0
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.term !== state.term) {
            return {
                term: props.term,
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
        if(this.state.courseSelected !== null) {
            let course = this.state.courseSelected;
            this.setState({ courseSelected: null });
            if(this.state.count > 0) {
                let array = this.state.suggest;
                array.push(course);
                this.setState({
                    suggest: array,
                    count: this.state.count - 1
                });
                this.getCourse()
            }
        }
    }

    render() {
    	return(
    		<div className="courseSearch">
                <h2>Schedule Helper</h2>
                <div className="algorithms">
                    <ButtonGroup vertical>
                        <Button variant="info" onClick={() => this.performNoTuesThurs()}>
                            No Tuesday or Thursday
                        </Button>
                    </ButtonGroup>
                </div>
                <CourseList buttonVariant="primary" buttonText="Add" buttonCallback={this.props.buttonCallback} errorText="" courses={this.state.suggest} term={this.state.term}/>
    		</div>
    	);
    }

    getCourse() {
        let basicCourses = [];
        for(let i = 0; i < this.state.courses.length; i++) {
            let basic = this.state.courses[i].code.slice() + ":"
            + this.state.courses[i].sections[0].code.slice() + ":"
            + this.state.courses[i].sections[0].term.slice();
            basicCourses.push(basic);
        }
        for(let i = 0; i < this.state.suggest.length; i++) {
            let basic = this.state.suggest[i].code.slice() + ":"
            + this.state.suggest[i].sections[0].code.slice() + ":"
            + this.state.suggest[i].sections[0].term.slice();
            basicCourses.push(basic);
        }
        axios.get("/randomCourse", {
            headers: {},
            params: {
                term: this.state.term,
                algorithm: this.state.algorithm,
                courses: basicCourses
            }
        }).then((resp) => {
            this.setState({
                courseSelected: resp.data,
            });
        })
        .catch((err) => {
            this.setState({
                courseSelected: null,
            });
        });
    }

    performNoTuesThurs() {
        let len = 5;
        for(let i = 0; i < this.state.courses.length; i++) {
            let course = this.state.courses[i];
            if(course.sections[0].term === this.state.term) {
                len -= 1;
            }
        }
        this.setState({
            algorithm: "NoTuesThurs",
            count: len,
            suggest: []
        });
        this.getCourse();
    }
}

export default ScheduleHelper;