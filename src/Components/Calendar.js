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
import "../css/Calendar.css";


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            let event = [];
            for(let i = 0; i < this.props.courses.length; i++) {
                for(let j = 0; j < this.props.courses[i].events.length; j++) {
                    
                    event.push(this.props.courses[i].events[j]);
                }
            }
            for (let i = 0; i < event.length; i++) {
                event[i].borderColor = event[i].originalBorderColor;
            }
            //check for conflicts between events
            //im sorry for the time complexity (it had to be done)
            for(let i = 0; i < event.length; i++) {
                //check overlaps
                for(let j = i + 1; j < event.length; j++) {
                    for(let k = 0; k < event[i].daysOfWeek.length; k++) {
                        for(let l = 0; l < event[j].daysOfWeek.length; l++) {
                            if(event[i].daysOfWeek[k] === event[j].daysOfWeek[l]) {
                                if(event[i].startTime < event[j].startTime) {
                                    if(event[i].endTime > event[j].startTime) {
                                        //set border color on conflict (default is white)
                                        event[i].borderColor = "red";
                                        event[j].borderColor = "red";
                                    }
                                }
                                else {
                                    if(event[j].endTime > event[i].startTime) {
                                        event[i].borderColor = "red";
                                        event[j].borderColor = "red";
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.setState({ events: event });
        }
    } 

    checkConflicts() {
        
    }

  render() {
    return (
    <div className="calendar-wrapper">
        <div className="calendar">
        <h2>Schedule</h2>
        <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="timeGridWeek"
            slotMinTime = {'07:00:00'}
            slotMaxTime = {'24:00:00'}
            editable={true}
            eventTimeFormat = {{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
            }}
            dayHeaderFormat={{
                weekday: 'short'
            }}
            contentHeight={'auto'}
            eventStartEditable={false}
            eventDurationEditable={false}
            events={this.state.events}
            allDaySlot={false}
            /* This will log into the Javascript console the date you clicked */
            dateClick={(e) => console.log(e.dateStr)}
            /* This will log into the console the ID of the event you clicked */
            eventClick={(e) => console.log(e.event.title)}
        />
        </div>
    </div>
    );
  }
}

export default Calendar;