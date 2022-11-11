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
