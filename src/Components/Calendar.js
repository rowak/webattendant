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
import "../css/Calendar.css";


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

    removeEvent(course, section) {
        var newArray = [];
        this.state.events.map((event) => {
            if(event.title.includes(course) == false || event.title.includes(section) == false) {
            newArray.push(event);
            }
        });
        this.setState({events: newArray});
    }

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
        <Button onClick={(e) => {
            this.addEvent("Event 4", "13:00", "1:00", [2]);
        }}>
            Add Course
        </Button>
        <Button onClick={(e) => {
            this.clearEvents();
        }}>
            Clear
        </Button>
        <Button onClick={(e) => {
            this.removeEvent("Event", "4");
        }}>
            Remove
        </Button>
        </div>
    </div>
    );
  }
}

export default Calendar;