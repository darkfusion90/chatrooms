import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Container from 'react-bootstrap/Container';
import NotificationContainer from '../NotificationContainer';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const style = { backgroundColor: "#23282d" }

const Header = () => {
    return (
        <Navbar collapseOnSelect style={style} expand="large" sticky="top">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="logo"> ChatRooms </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end flex-row">
                    <Link to="/rooms" className="header-text">Rooms</Link>
                    <NotificationContainer />
                    <NavItem as={"span"} className="header-icon" >
                        <FontAwesomeIcon icon={faUser} size="lg" />
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;

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