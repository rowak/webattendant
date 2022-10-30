import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

class CourseInput extends React.Component {
    colors = ['red', 'blue', 'orange', 'green', 'purple'];
    searchTypes = ['Lowest Day', 'No Tuesday Thursday', 'No Evenings', 'No Early Mornings', 'No Fridays'];
    render() {
        return (
            <div>
                <h2>CourseLoader</h2>
                <div>
                    {this.genQueryButton("/randomCourse", "Random", "GET")}
                </div>
                <div>
                    <h5>Courses</h5>
                    {/* //iterate through colors and generate inputs with genCourseInput*/}
                    {this.colors.map((inputColor) => (
                        this.genCourseInput('text', 'courses', 'Course: (e.g CIS*3760)', {color: inputColor})
                    ))}

                    <input
                        type="checkbox"
                        id="ExamCheck"
                        name="ExamCheck"
                        value="check"
                    ></input>

                    <label for="ExamCheck">Show Exams?</label>

                    <br></br>
                </div>
                <div class="parent">
                    <div class="child">
                        <h6>Schedule Helper</h6>
                        {this.searchTypes.map((searchType) => (
                            <Form.Check
                                type="radio"
                                label={searchType}
                                id={searchType}
                            />
                        ))}
                    </div>

                    <div class="child">
                        <h6>Suggested Courses</h6>
                        {this.searchTypes.map((searchType) => (
                            <div>
                            {this.genInput('text', '', '', '', '', undefined)}
                            <br/>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button">Apply</button>
            </div>
        );
    }
    genCourseInput(type, list, placeholder, style) {
        return (
            <>
                <input
                    type={type}
                    id="default"
                    list={list}
                    placeholder={placeholder}
                    style={style}
                ></input>
                <datalist id="courses">
                    <option value="CIS*1500"></option>
                </datalist>
                <input
                    type="text" id='default' placeholder="e.g. 0101" style={style}
                ></input>
                <br></br>
            </>
        );
    }
    genInput(type, id, list, name, placeholder, style ) {
        return (
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
            ></input>
        );
    }

    genQueryButton(url, name, query) {
        return (
            <>
                <Button onClick={(e) => {
                    let formData = new FormData();
    
                    // Adding files to the formdata
                    formData.append("name", "Name");
    
                    axios({
                        url: url,
                        method: query,
                        headers: {},
                        data: formData,
                    })
                    .then((res) => { console.log(res["data"]) })
                    .catch((err) => { console.log("err") });
                }}>
                    {name}
                </Button>
            </>
        );
    }
}

export default CourseInput;
