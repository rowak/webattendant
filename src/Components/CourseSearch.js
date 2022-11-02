import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CourseList from './CourseList.js';
import { InputGroup } from 'react-bootstrap';
import '../css/CourseSearch.css';

class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: "", errorText: "", courses: props.courses};
        this.queryChanged = this.queryChanged.bind(this);
        this.search = this.search.bind(this);
        this.enterKeyHandler = this.enterKeyHandler.bind(this);
    }

    render() {
        return (
            <div className="courseSearch">
                <div className="courseSearchContent">
                    <h2>Search</h2>
                    <InputGroup className="mb-1">
                        <Form.Control type="text" placeholder="Enter a course name or code" value={this.state.query} onChange={this.queryChanged} onKeyDown={this.enterKeyHandler}></Form.Control>
                        <Button variant="secondary" onClick={this.search}>Search</Button>
                    </InputGroup>
                    <CourseList buttonVariant="primary" buttonText="Add" buttonCallback={this.props.buttonCallback} errorText={this.state.errorText} courses={this.state.courses}/>
                </div>
            </div>
        );
    }

    queryChanged(e) {
        this.setState({
            query: e.target.value
        });
    }

    search() {
        axios.get("/search", {
            headers: {},
            params: {
                query: this.state.query
            }
        })
        .then((resp) => {
            this.setState({
                courses: resp.data,
                errorText: "No courses found."
            });
        })
        .catch((err) => {
            this.setState({
                courses: [],
                errorText: "An error has occurred."
            });
        });
    }

    enterKeyHandler(e) {
        if (e.key === "Enter") {
            this.search()
        }
    }
}

export default CourseSearch;