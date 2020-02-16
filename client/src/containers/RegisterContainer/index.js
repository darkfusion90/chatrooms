import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import RegistrationForm from '../../components/forms/RegistrationForm/RegistrationForm';
import registerUser from '../../actions/registerUser';
import { Redirect } from 'react-router-dom';

class RegisterContainer extends React.Component {

    onRegistrationFailed = ({ response }) => {
        console.log("Registration failed: ", response)
    }

    onFormSubmit = (formValues) => {
        console.log("Registration Form Values: ", formValues)
        this.props.registerUser(
            formValues.username,
            formValues.password,
            formValues.confirmPassword,
            this.onRegistrationFailed
        )
    }

    renderAppropriateRedirect = (isUserLoggedIn) => {
        if (isUserLoggedIn) {
            return <Redirect to="/" />
        }

        return <Redirect to={{
            pathname: "/login",
            state: { isRedirectFromSuccessfulRegister: true }
        }} />
    }

    render() {
        console.log(this.props)
        if (this.props.isUserRegistered) {
            return this.renderAppropriateRedirect(this.props.isUserLoggedIn)
        }

        return (
            <div className="centered-content">
                <Container>
                    <RegistrationForm onFormSubmit={this.onFormSubmit} />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isUserRegistered: state.user.isRegistered,
        isUserLoggedIn: state.user.loggedIn
    }
}

export default connect(mapStateToProps, { registerUser })(RegisterContainer);
