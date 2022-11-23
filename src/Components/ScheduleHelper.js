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
            term: props.term,
            algorithm: null,
            start: false,
            ignore: true
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
    		<div className="courseSearch">
                <h2>Schedule Helper</h2>
                <div className="algorithms">
                    <ButtonGroup vertical>
                        <Button variant="info" onClick={() => this.performNoTuesThurs()}>
                            No Tuesday or Thursday
                        </Button>
                        <Button variant="info" onClick={() => this.performNoFriday()}>
                            No Fridays
                        </Button>
                        <Button variant="info" onClick={() => this.performNoMornings()}>
                            No Mornings
                        </Button>
                        <Button variant="info" onClick={() => this.performNoEvenings()}>
                            No Evenings
                        </Button>
                    </ButtonGroup>
                </div>
                <CourseList buttonVariant="primary" buttonText="Add" buttonCallback={this.props.buttonCallback} errorText="" courses={this.state.suggest} term={this.state.term} courseClickCallback={this.props.courseClickCallback}/>
    		</div>
    	);
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