import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders header text', () => {
  render(<App />);
  expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("WebAttendant");
});