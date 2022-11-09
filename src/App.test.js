import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders header text', () => {
  render(<App />);
  expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("WebAttendant");
});