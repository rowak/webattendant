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
import Button from 'react-bootstrap/Button';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.courses);
        this.state = {
            events: []
        };
    }

    // clearEvents() {
    //     this.setState({ events: [] });
    // }

    // addEvent(title, start, duration, days) {
    //     var newevent = { title: title, startTime: start, duration: duration, daysOfWeek: days };
    //     this.setState({ events: [...this.state.events, newevent] });
    // }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            let event = [];
            for(let i = 0; i < this.props.courses.length; i++) {
                for(let j = 0; j < this.props.courses[i].events.length; j++) {
                    event.push(this.props.courses[i].events[j]);
                }
            }
            this.setState({ events: event });
        }
    } 

    render() {
        return (
            <div className="calendar">
                <p>{JSON.stringify(this.props.courses)}</p>

                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    headerToolbar={false}
                    initialView="timeGridWeek"
                    slotMinTime={'07:00:00'}
                    slotMaxTime={'24:00:00'}
                    editable={true}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'short',
                    }}
                    /*
                    Potential button to add more courses?
            
                    customButtons={{
                      new: {
                        text: 'new',
                        click: () => console.log('new event'),
                      },
                    }}*/
                    events={this.state.events}
                    allDaySlot={false}
                    /*
                    Tried out colour command to force change the colour. However cannot
                    just use random to get random colours
                    eventColor="random"
                    */
                    /* This will log into the Javascript console the date you clicked */
                    dateClick={(e) => console.log(e.dateStr)}
                    /* This will log into the console the ID of the event you clicked */
                    eventClick={(e) => console.log(e.event.title)}
                />
            </div>);
    }
}

export default Calendar;