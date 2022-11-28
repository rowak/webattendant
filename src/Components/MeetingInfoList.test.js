import { render, screen } from '@testing-library/react';
import MeetingInfoList from './MeetingInfoList.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM

// Testing to see if meeting info list is rendered
test('MeetingInfoList rendered', () => {
    let meetings = [];

    render(<MeetingInfoList meetings={meetings} />);

    expect(screen.getByRole("table")).toHaveClass("meeting-grid");
});

// Test case to see if meeting info list contains the required data
test('MeetingInfoList displays meeting', () => {
    let meetings = [{
        "type": "LEC",
        "daysOfWeek": [
           "Fri"
        ],
        "startTime": "08:30AM",
        "endTime": "10:20AM",
        "date": null,
        "roomInfo": {
           "building": "ROZH",
           "roomNumber": "104"
        }
    }];

    render(<MeetingInfoList meetings={meetings} />);
    
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("LEC");
});
