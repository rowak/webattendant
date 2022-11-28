import React from "react";
import TypeWriterEffect from "react-typewriter-effect";
import { Link } from "react-router-dom";
import './Landing.css';
import { Button, Image } from "react-bootstrap";
import { Logo } from "../Assets/W_logo_fullsize.png";
class Landing extends React.Component {
    render() {
        return (
            <div className="Landing">
                {/* bootsrap image */}
                <Image className="logo" src={Logo} size fluid />
                <TypeWriterEffect
                    text="Welcome to WebAttendant, a better way to schedule your classes."
                    cursorColor="white"
                />
                <Link to="/scheduler">
                    <Button variant="primary" size="lg" active>Get Started</Button>
                </Link>
            </div>
        );
    }
}
export default Landing;
