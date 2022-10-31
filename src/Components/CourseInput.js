import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Terminal, {TerminalOutput} from 'react-terminal-ui';
import './CourseInput.css';   

class CourseInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { requestResult: "Press a Button!" };
    }
    colors = ['red', 'blue', 'orange', 'green', 'purple'];
    searchTypes = ['Lowest Day', 'No Tuesday Thursday', 'No Evenings', 'No Early Mornings', 'No Fridays'];
    render() {
        return (
            <div className='courseInput'>
                <h2>CourseLoader</h2>
                <div>
                    {this.genQueryButton("/randomCourse", "Random", "GET", {})}
                    {this.genQueryButton("/getCourse", "CIS*3760", "GET", { "code": "CIS*3760" })}
                    {this.genQueryButton("/getCourse", "Section 0101", "GET", { "code": "CIS*3760", "sectionCode": "0101" })}
                </div>
                <h3>Outputs:</h3>
                <div className='terminalContainer' style={{width: "50%"}}>
                    <Terminal startingInputValue='Press a Button!'>
                        <TerminalOutput>{this.state.requestResult}</TerminalOutput>
                    </Terminal>
                </div>
                <div>
                    <h5 className='courseInput_h5'>Courses</h5>
                    {/* //iterate through colors and generate inputs with genCourseInput*/}
                    {this.colors.map((inputColor) => (
                        this.genCourseInput('text', 'courses', 'Course: (e.g CIS*3760)', { color: inputColor })
                    ))}

                    <input
                        type="checkbox"
                        id="ExamCheck"
                        name="ExamCheck"
                        value="check"
                    ></input>

                    <label className="courseInput_label" for="ExamCheck">Show Exams?</label>

                    <br></br>
                </div>
                <div className="choiceHolder">
                    <div className="choiceSection">
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
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <Button>Apply</Button>
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
    genInput(type, id, list, name, placeholder, style) {
        return (
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
            ></input>
        );
    }

    genQueryButton(url, name, query, args) {
        return (
            <Button onClick={(e) => {
                axios({
                    url: url,
                    method: query,
                    headers: {},
                    params: args,
                })

                    .then((res) => { this.setState({ requestResult: JSON.stringify(res.data, null, 2) }) })
                    .catch((err) => { console.log("err") });
            }}>
                {name}
            </Button>
        );
    }
}

export default CourseInput;
