import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

import { NotificationIcon, UserIcon } from './components'
import { withoutNavigateProp } from '../standalone'
import './Header-Style.scss'


const RegisterButton = (
    <Link to='/register' component={(props) => withoutNavigateProp(props, Button)}>
        Register
    </Link>
)

const LoginButton = (
    <Link
        to='/login'
        component={(props) => withoutNavigateProp(props, Button)}
        variant='outline-primary'
    >
        Login
    </Link>
)

const HeaderView = ({ isUserRegistered, isUserLoggedIn }) => {
    const asNavItem = (component) => {
        return <Nav.Item className='mx-3 cursor-pointer'>{component}</Nav.Item>
    }

    const getRegisterButton = () => {
        return !isUserRegistered ? asNavItem(RegisterButton) : null;
    }

    const getLoginButton = () => {
        return !isUserLoggedIn ? asNavItem(LoginButton) : null;
    }

    const getUserIcon = () => {
        return (isUserLoggedIn && isUserRegistered) ? asNavItem(<UserIcon />) : null;
    }

    return (
        <Container className='header-navbar-container' fluid>
            <Navbar expand='large' sticky='top'>
                <Navbar.Brand>
                    <Link to="/" className='brand'> ChatRooms </Link>
                </Navbar.Brand>

                <Nav className='flex-row'>
                    <Container>
                        <Nav.Item className='mx-3'>
                            <Link
                                to='/rooms'
                                component={(props) => withoutNavigateProp(props, Nav.Link)}
                                className='header-text'
                            >
                                Rooms
                            </Link>
                        </Nav.Item>
                        <Nav.Item className='mx-3 cursor-pointer'>
                            <NotificationIcon />
                        </Nav.Item>
                        {getLoginButton()}
                        {getRegisterButton()}
                        {getUserIcon()}
                    </Container>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default HeaderView;

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