import { render, screen } from '@testing-library/react';
import ScheduleHelper from './ScheduleHelper.js';
import React from 'react';

// Function for testing the basic existence
test('Helper rendered', () => {
  render(<ScheduleHelper
    term="Winter 2023"
  />);
  expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Schedule Helper");
});
