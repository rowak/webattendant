import { render, screen } from '@testing-library/react';
import CourseInfo from './CourseInfo.js';
import React from 'react';

// Function for testing the basic existence
test('Info box rendered', () => {
  render(<CourseInfo />);
  expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Info");
});