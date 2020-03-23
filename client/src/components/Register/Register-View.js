import React from 'react';
import Container from 'react-bootstrap/Container';
import { Redirect } from 'react-router-dom';

import { RegistrationForm } from './components'

export default ({ onFormSubmit, isUserLoggedIn, isUserRegistered }) => {
    const renderRedirect = () => {
        const RedirectToHome = <Redirect to="/" />
        const RedirectToLogin = <Redirect to={{
            pathname: "/login",
            state: { isRedirectFromSuccessfulRegister: true }
        }} />

        if (isUserLoggedIn) {
            return RedirectToHome;
        } else if (isUserRegistered) {
            return isUserLoggedIn ? RedirectToHome : RedirectToLogin
        }
    }

    if (isUserLoggedIn || isUserRegistered) {
        return renderRedirect()
    }
    return (
        <div className="centered-content">
            <Container>
                <RegistrationForm onFormSubmit={onFormSubmit} />
            </Container>
        </div>
    )
}