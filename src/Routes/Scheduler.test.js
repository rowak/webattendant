import { render, screen } from '@testing-library/react';
import Scheduler from './Scheduler';
import React from 'react';

test('renders header text', () => {
  render(<Scheduler />);
  expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("WebAttendant");
});