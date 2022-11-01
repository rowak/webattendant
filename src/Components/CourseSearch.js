import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CourseList from './CourseList.js';
import '../css/CourseSearch.css';
import { InputGroup } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.courseList = <CourseList buttonVariant="primary" buttonText="Add" errorText="No courses found."/>;
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
                {this.courseList}
            </div>
        );
    }
}

export default CourseSearch;
