import { render, screen } from '@testing-library/react';
import MeetingInfoList from './MeetingInfoList.js'; // Import the component/file you are testing
import React from 'react'; // Required to interact with the React DOM


test('MeetingInfoList rendered', () => {
    let meetings = [];

    const { container } = render(<MeetingInfoList meetings={meetings} />);

    expect(container.firstChild.classList.contains('meeting-grid')).toBe(true)

});
  


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




