/*
Logo credits

<div>
    Icons made by 
    <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
        Smashicons
    </a> 
    from 
    <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
    </a>
</div>
*/

import React from 'react';

import NotificationContainer from './NotificationContainer';

import logo from "../../assets/navbarLogo.svg"
import './Header.css';


class Header extends React.Component {
    render() {
        console.log("header " + this.props.notifications)
        return (
            <header>
                <div className="ui orange inverted menu">
                    <a className="navbar-logo-container" href="/" className="item">
                        <img src={logo} />
                        <span className="navbar-logo-text">Chatrooms</span>
                    </a>
                    <div className="right menu">
                        <NotificationContainer notifications={this.props.notifications}/>
                        <span className="item">
                            <i className="big black user circle icon" />
                        </span>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
