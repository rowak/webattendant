import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../css/AppHeader.css';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElement: false,
            open: false
        };
    }

    setMenuActive(el, open) {
        this.setState({
            anchorElement: el,
            open: open
        })
    }

    render() {
        return (
            <header className="App-header">
                <div className="header-menu-button">
                    <button
                        id="menu-button"
                        onClick={(e) => this.setMenuActive(e.currentTarget, true)}>
                        <img src="more_vert_white_24dp.svg"/>
                    </button>
                </div>
                <h1>WebAttendant</h1>
                <div className="header-menu dummy">
                    <img src="more_vert_white_24dp.svg"/>
                </div>
                <Menu
                    id="menu"
                    anchorEl={this.state.anchorElement}
                    open={this.state.open}
                    onClose={() => this.setMenuActive(null, false)}
                >
                    <MenuItem onClick={(e) => console.log("export")}>Export to PDF</MenuItem>
                    <MenuItem onClick={(e) => console.log("clear")}>Clear Schedule</MenuItem>
                </Menu>
            </header>
        );
    }
}

export default AppHeader;
