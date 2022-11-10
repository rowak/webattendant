import { render, screen } from '@testing-library/react';
import CourseSearch from './CourseSearch.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM

// Basic render check
test('CourseSearch rendered', () => {
    render(<CourseSearch courses={[]} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Search");
});

// test if course search works
test('CourseSearch displaying courses list', () => {
    //supply course data and check if it appears
    render(<CourseSearch courses={[
        {
            code: 'hello world',
            sections: [
                {
                    name: 'testing-section',
                }
            ]
        }
    ]} />);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("hello world");
    //find <p> tag with text "testing section"
    expect(screen.getByText("testing-section")).toBeInTheDocument();
});


