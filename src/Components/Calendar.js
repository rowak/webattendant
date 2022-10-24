import React from 'react';

/* Code for creating a calendar comes from
Slightly edited
https://levelup.gitconnected.com/create-a-month-week-and-day-view-calendar-with-react-and-fullcalendar-1794d76e6d06
*/

/*
Libraries required for calendar to work
*/
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

/* These are the events that will get displayed.
As seen by the id 2, you cannot just put a day of the week, you
must put in the day-month-year for it to work. Potentially problematic */
const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2022-10-17T10:00:00',
    end: '2022-10-17T12:00:00',
  },
  {
    id: 2,
    title: 'event 2',
    start: 'MONDAY13:00:00',
    end: 'MONDAYT18:00:00',
  },
  { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
];

class Calendar extends React.Component {
  render() {
    return (
    <div className="App">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        /*
        This command will hide the header. However for some reason the calendar's
        width scales with the header.
        headerToolbar={false}
        */

        initialView="timeGridWeek"
        slotMinTime = {'07:00:00'}
        slotMaxTime = {'24:00:00'}
        /*
        Potential button to add more courses?

        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event'),
          },
        }}*/
        events={events}
        /*
        Tried out colour command to force change the colour. However cannot
        just use random to get random colours
        eventColor="random"
        */

        /* This will log into the Javascript console the date you clicked */
        dateClick={(e) => console.log(e.dateStr)}

        /* This will log into the console the ID of the event you clicked */
        eventClick={(e) => console.log(e.event.id)}
      />
    </div> );
  }
}

export default Calendar;