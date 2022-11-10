import { render, screen } from '@testing-library/react';
import Calendar from './Calendar.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM

// To test if the calendar componenent was rendered, we can check if the
// role "grid" exists. The Fullcalendar will create the grid

// Basic test case to see if the calendar
test('Calendar rendered', () => {
  render(<Calendar courses={[]} />);
  expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Schedule");
  expect(screen.getByRole('grid')).toBeInTheDocument();
});

// Unfortunately testing mostly relies on clicking the object and noticing 
// changes.
// Eg, monitoring a button to check when we click it, a function is called
//This means testing is not really built to notice things like
// state changes. Not to mention
// most of the clickable things are hidden behind the FullCalendar library
// Therefore, we cannot access the internal variables to notice changes as those
// are handled by the FullCalendar library, and we cannot access our own internal
// variables due to how testing works

// This means we cannot really test the Calendar app beyond checking existence
// unless some more methods are found, as most of the calendar revolves around
// implementation rather than being interactable