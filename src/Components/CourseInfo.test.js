import { render, screen } from '@testing-library/react';
import CourseInfo from './CourseInfo.js';
import React from 'react';

// Function for testing the basic existence
test('Info box rendered', () => {
  let course = {
    "code": "CIS*3760",
    "sections": [
      {
        "code": "0101",
        "name": "Software Engineering",
        "teachers": [],
        "meetings": null
      }
    ]
  };

  render(<CourseInfo course={course}/>);
  expect(screen.getByRole("heading", {level: 2}))
    .toHaveTextContent(`${course.code} (${course.sections[0].code}) ${course.sections[0].name}`);
});