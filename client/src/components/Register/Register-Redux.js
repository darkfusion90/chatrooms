import React from 'react';
import { connect } from 'react-redux';

import RegisterView from './Register-View'
import registerUser from '../../actions/registerUser';

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

    render() {
        const { isUserLoggedIn, isUserRegistered } = this.props

        return (
            <RegisterView
                isUserLoggedIn={isUserLoggedIn}
                isUserRegistered={isUserRegistered}
                onFormSubmit={this.onFormSubmit}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isUserRegistered: state.user.user && state.user.user.isRegistered,
        isUserLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, { registerUser })(RegisterContainer);
