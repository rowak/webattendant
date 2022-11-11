import { render, screen } from '@testing-library/react';
import CourseSearch from './CourseSearch.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM


// Basic test case to see if the search box is rendered
test('Search rendered', () => {
  let callback = () => {};
  let course = [];
  render(<CourseSearch courses={course} buttonCallback={callback} />);
  expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Search");
});
