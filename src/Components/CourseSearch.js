import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import '../css/CourseSearch.css';
import { InputGroup } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {results: []};
    }

    render() {
        return (
            <div className="courseSearch">
                <h2>Search</h2>
                <InputGroup className="mb-2">
                    <Form.Control type="text" placeholder="Enter a course name or code"></Form.Control>
                    <Button variant="secondary">Search</Button>
                </InputGroup>
                {this.getCourses()}
            </div>
        );
    }

    getCourses() {
        if (this.state.results.length === 0) {
            return <h5 className="errorText">No courses found.</h5>;
        }
        else {
            return (
                <React.Fragment>
                {this.state.courses.map(course => {
                    return (
                    <ListGroup>
                        <ListGroupItem className="courseListItem ms-0">
                            <div>
                                <h5>{course.code} ({course.sections[0].code})</h5>
                                <p>Test</p>
                            </div>
                            <Button>Add</Button>
                        </ListGroupItem>
                    </ListGroup>
                    );
                })}
                </React.Fragment>
            );
        }
    }
}

export default CourseSearch;
