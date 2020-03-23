import React from 'react';
import { connect } from 'react-redux';

import LoginView from './Login-View'
import { loginUser } from '../../redux/actions/user-actions'

class LoginRedux extends React.Component {
    onFormSubmit = (formValues) => {
        this.props.loginUser(
            formValues.username,
            formValues.password,
            this.props.onLoginFailure
        );
    }

    render() {
        const {
            shouldShowErrorAlert,
            errorReason,
            onErrorAlertDismissed,
            isUserLoggedIn
        } = this.props

        return (
            <LoginView
                isUserLoggedIn={isUserLoggedIn}
                errorReason={errorReason}
                shouldShowErrorAlert={shouldShowErrorAlert}
                onErrorAlertDismissed={onErrorAlertDismissed}
                onFormSubmit={this.onFormSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { isUserLoggedIn: state.user.isLoggedIn }
}

export default connect(mapStateToProps, { loginUser })(LoginRedux);
