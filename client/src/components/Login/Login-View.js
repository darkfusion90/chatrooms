import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';

import { LoginForm } from './components'
import { DismissibleAlert } from '../standalone'

import './Login-Style.scss'

const renderAppropriateContentIfRedirect = (props) => {
    const locationState = props.location.state;
    if (locationState && locationState.isRedirectFromSuccessfulRegister) {
        return (
            <Alert variant="success">
                <Alert.Heading>Registration Completed!</Alert.Heading>
                <p>Please login to continue</p>
            </Alert>
        )
    }
}

const renderLoginView = (props) => {
    const {
        shouldShowErrorAlert,
        errorReason,
        onErrorAlertDismissed,
        onFormSubmit
    } = props

    return (
        <Container className="compensate-header">
            <div className="centered-content login-container">
                {false && renderAppropriateContentIfRedirect(props)}
                <DismissibleAlert
                    variant="danger"
                    heading="Login Unsuccessful"
                    body={errorReason}
                    show={shouldShowErrorAlert}
                    onDismiss={onErrorAlertDismissed}
                />
                <LoginForm onFormSubmit={onFormSubmit} />
            </div>
        </Container>
    )
}

const LoginView = (props) => {
    return props.isUserLoggedIn ? <Redirect to="/" /> : renderLoginView(props)
}


export default LoginView