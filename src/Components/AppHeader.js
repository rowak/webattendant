import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as htmlToImage from 'html-to-image'
import '../css/AppHeader.css';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElement: false,
            open: false,
            term: props.term
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.term !== state.term) {
            return {
                term: props.term
            }
        }
        return null;
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
                        <img src="more_vert_white_24dp.svg" alt=""/>
                    </button>
                </div>
                <h1>WebAttendant</h1>
                <div className="header-menu dummy">
                    <img src="more_vert_white_24dp.svg" alt=""/>
                </div>
                <Menu
                    id="menu"
                    anchorEl={this.state.anchorElement}
                    open={this.state.open}
                    onClose={() => this.setMenuActive(null, false)}
                >
                    <MenuItem onClick={() => this.exportToPNG()}>Export to PNG</MenuItem>
                    <MenuItem onClick={() => console.log("clear")}>Clear Schedule</MenuItem>
                </Menu>
            </header>
        );
    }

    exportToPNG() {
        let node = document.getElementById("schedule");
        let term = this.state.term.replace(" ", "");
        htmlToImage.toPng(node, {
            backgroundColor: "#282c34"
        })
        .then(function(dataUrl) {
            const link = document.createElement("a")
            link.download = term + "_Schedule.png"
            link.href = dataUrl
            link.click()
        });
    }
}

export default AppHeader;
