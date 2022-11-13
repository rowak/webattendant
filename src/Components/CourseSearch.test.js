import { render, screen } from '@testing-library/react';
import CourseSearch from './CourseSearch.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM

// Basic render check
test('CourseSearch rendered', () => {
    render(<CourseSearch courses={[]} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Search");
});

//
test('CourseSearch displaying courses list', () => {
    //supply course data and check if it appears
    render(<CourseSearch courses={[
        {
            code: 'CIS*3760',
            sections: [
                {
                    name: '0101',
                }
            ]
        }
    ]} />);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("CIS*3760");
    //find <p> tag with text "testing section"
    expect(screen.getByText("0101")).toBeInTheDocument();
});

test('CourseSearch displaying Add button', () => {
    //supply course data and check if it appears
    render(<CourseSearch courses={[
        {
            code: 'CIS*3760',
            sections: [
                {
                    name: '0101',
                }
            ]
        }
    ]} />);
    
    const button = screen.getAllByRole("button", { children: "Add"})[1];
    //console.log(buttons.getAttribute("type"));
    expect(button).toHaveClass("btn btn-primary");
    //find <p> tag with text "testing section"
    expect(screen.getByText("0101")).toBeInTheDocument();

});

test('CourseSearch displaying Search as a button', () => {
    //supply course data and check if it appears
    render(<CourseSearch courses={[
        {
            code: 'CIS*3760',
            sections: [
                {
                    name: '0101',
                }
            ]
        }
    ]} />);
    
    const button = screen.getAllByRole("button", { children: "Search"})[0];

    expect(button).toHaveClass("btn btn-secondary");

    expect(screen.getByText("0101")).toBeInTheDocument();

});












