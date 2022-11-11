import { render, screen } from '@testing-library/react';
import CourseList from './CourseList.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM


// Basic test case to see if the CourseList renders
test('CourseList rendered', () => {
  let callback = () => {};
  let course = [];
  render(<CourseList buttonVariant="primary" buttonText="test" buttonCallback={callback} errorText={"error"} courses={course} />);
  expect(screen.getByRole("heading", {level: 5})).toHaveTextContent("error");
});
