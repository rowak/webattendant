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
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {Tooltip} from 'bootstrap';
import "../css/Calendar.css";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            termSelectors: props.termSelectors,
            term: props.term
        };
    }

    tooltip = null;

    static getDerivedStateFromProps(props, state) {
        if (props.term !== state.term) {
            return {
                term: props.term
            }
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let event = [];
            for (let i = 0; i < this.props.courses.length; i++) {
                if (this.props.courses[i].sections[0].term === this.state.term) {
                    for (let j = 0; j < this.props.courses[i].events.length; j++) {
                        event.push(this.props.courses[i].events[j]);
                    }
                }
            }
            for (let i = 0; i < event.length; i++) {
                event[i].borderColor = event[i].originalBorderColor;
            }
            //check for conflicts between events
            //im sorry for the time complexity (it had to be done)
            for (let i = 0; i < event.length; i++) {
                //check overlaps
                this.checkConflicts(event[i], event, i);
            }
            this.setState({ events: event });
        }
    }

    checkConflicts(currEvent, events, i) {
        for (let j = i + 1; j < events.length; j++) {
            for(let day = 0; day < 7; day++) {
                if(currEvent.daysOfWeek.includes(day) && events[j].daysOfWeek.includes(day)) {
                    if(currEvent.backgroundColor !== events[j].backgroundColor) {
                        if (currEvent.startTime < events[j].startTime) {
                            if (currEvent.endTime > events[j].startTime) {
                                this.highlightConflict(currEvent, events[j]);
                            }
                        }
                        else {
                            if (events[j].endTime > currEvent.startTime) {
                                this.highlightConflict(currEvent, events[j]);
                            }
                        }
                    }
                }
            }
        }
    }
    
    //set border color on conflict (default is white)
    highlightConflict(event1, event2) {
        event1.borderColor = "red";
        event2.borderColor = "red";
    }
    render() {
        return (
            <div className="calendar-wrapper">
                <div className="term-selectors">
                    <ButtonGroup>
                        {this.state.termSelectors?.map((selector, i) => {
                            let variant = "secondary";
                            if (this.state.term === selector) {
                                variant = "primary";
                            }
                            return <ToggleButton key={i} variant={variant} onClick={() => this.props.termSelectorCallback(selector)}>{selector}</ToggleButton>
                        })}
                    </ButtonGroup>
                </div>
                <div className="calendar">
                    <h2>Schedule</h2>
                    <div id="schedule">
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
                            dayHeaderFormat={{
                                weekday: 'short'
                            }}
                            contentHeight={'850px'}
                            expandRows={'true'}
                            eventStartEditable={false}
                            eventDurationEditable={false}
                            events={this.state.events}
                            allDaySlot={false}
                            eventMouseEnter={(info) => {
                                if (info.event.title) {
                                    let startTime = this.getFormattedTime(info.event.start);
                                    let endTime = this.getFormattedTime(info.event.end);
                                    let tooltipStr = `${info.event.title}<br>(${startTime} - ${endTime})`
                                    this.tooltip = new Tooltip(info.el, {
                                        title: tooltipStr,
                                        html: true,
                                        placement: "top",
                                        trigger: "hover",
                                        container: "body"
                                    });
                                    this.tooltip.show();
                                }
                            }}
                            eventMouseLeave={() => {
                                if (this.tooltip) {
                                    this.tooltip.dispose();
                                    this.tooltip = null;
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    getFormattedTime(date) {
        return date.toLocaleString("en-US", {
            weekday: undefined,
            day: undefined,
            year: undefined,
            months: undefined,
            hour: 'numeric',
            minute: 'numeric',
            second: undefined
        });
    }
}

export default Calendar;
