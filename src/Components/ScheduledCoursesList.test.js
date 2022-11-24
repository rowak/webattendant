import { render, screen } from '@testing-library/react';
import ScheduledCourseList from './ScheduledCoursesList.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM

// Basic test case to see if the textbox for selected courses is rendered
test('ScheduledCourseList rendered', () => {
  let callback = () => {};
  let course = [];
  render(<ScheduledCourseList courses={course} buttonCallback={callback} />);
  expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Courses");
});

// test if Scheduled Courses List
test('Scheduled Course List displaying courses list', () => {
    //supply course data and check if it appears
    render(<ScheduledCourseList courses={[
        {
            code: 'Test-scheduled-course',
            sections: [
                {
                    name: 'testing-section',
                }
            ]
        }
    ]} />);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("Test-scheduled-course");
    //find <p> tag with text "testing section"
    expect(screen.getByText("testing-section")).toBeInTheDocument();
});

test('Scheduled Course List displaying Remove button', () => {
    //supply course data and check if it appears
    render(<ScheduledCourseList courses={[
        {
            code: 'Test-scheduled-course',
            sections: [
                {
                    name: 'testing-section',
                }
            ]
        }
    ]} />);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("Test-scheduled-course");
    //find <p> tag with text "testing section"
    expect(screen.getByText("testing-section")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button", { children: "Remove"})[0];

    expect(buttons).toHaveClass("btn btn-danger");
});
