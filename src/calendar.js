import React from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
        /*headerToolbar={false}*/
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
        eventColor="random"

        /* This will log into the Javascript console the date you clicked */
        dateClick={(e) => console.log(e.dateStr)}

        /* This will log into the console the ID of the event you clicked */
        eventClick={(e) => console.log(e.event.id)}
      />
    </div> );
  }
}

export default Calendar;