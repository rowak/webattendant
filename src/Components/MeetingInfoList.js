import React from 'react';
import '../css/MeetingInfoList.css';

class MeetingInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: props.meetings
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.meetings !== state.meetings) {
            return {
                meetings: props.meetings
            };
        }
        return null;
    }

    render() {
        let meetings = this.state.meetings;
        if (meetings !== null) {
            return (
                <div className="meeting-grid">
                    {meetings.map((meeting, i) => {
                        let location = "TBA";
                        if (meeting.roomInfo.building !== null && meeting.roomInfo.roomNumber !== null) {
                            location = `${meeting.roomInfo.building} ${meeting.roomInfo.roomNumber}`;
                        }
                        return (
                            <div key={i} className="meeting-info">
                                <h4>{meeting.type}</h4>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="fieldLabel">Days:</td>
                                            <td>{meeting.daysOfWeek.join(", ")}</td>
                                        </tr>
                                        <tr>
                                            <td className="fieldLabel">Time:</td>
                                            <td>{`${meeting.startTime} - ${meeting.endTime}`}</td>
                                        </tr>
                                        <tr>
                                            <td className="fieldLabel">Location:</td>
                                            <td>{location}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            );
        }
        else {
            return (
                null
            );
        }
    }
}

export default MeetingInfoList;
