import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Container from 'react-bootstrap/Container';
import UserDropdownInfo from '../../containers/UserDropdownInfo'
import NotificationContainer from '../NotificationContainer';
import './Header.scss';

const style = { backgroundColor: "#23282d" }

const renderConditionallyLoggedInStatus = (loggedIn) => {
    if (loggedIn) {
        return (
            <UserDropdownInfo />
        );
    }
    else {
        return (
            <>
                <Link to="/login">
                    <NavItem as={"span"} className="header-icon" >
                        <Button size="sm">Login</Button>
                    </NavItem>
                </Link>

                <Link to="/register">
                    <NavItem as={"span"} className="header-icon" >
                        <Button size="sm">Register</Button>
                    </NavItem>
                </Link>
            </>
        );
    }
}

const Header = (props) => {
    return (
        <Navbar collapseOnSelect style={style} expand="large" sticky="top">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="logo"> ChatRooms </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end flex-row">
                    <div className="header-item-container">
                        <Link to="/rooms" className="header-text">Rooms</Link>
                    </div>
                    <div className="header-item-container">
                        <NotificationContainer />
                    </div>
                    {renderConditionallyLoggedInStatus(props.loggedIn)}
                </Nav>
            </Container>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return { loggedIn: state.user.loggedIn }
}

export default connect(mapStateToProps, null)(Header);

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