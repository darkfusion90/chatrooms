import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';


import LoginForm from '../../components/forms/LoginForm/'
import loginUser from '../../actions/loginUser';
import DismissibleAlert from '../../components/Alerts/DismissibleAlert'

import './style.scss'

class LoginContainer extends React.Component {
    state = {
        hasLoginError: false,
        errorReason: null,
        showErrorAlert: false,
    }

    onLoginFailure = ({ response }) => {
        this.setState({
            hasLoginError: true,
            errorReason: response.data.reason,
            showErrorAlert: true
        })
    }

    onFormSubmit = (formValues) => {
        this.props.loginUser(
            formValues.username,
            formValues.password,
            this.onLoginFailure
        );
    }

    renderAppropriateContentIfRedirect = (props) => {
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

    render() {
        if (this.props.isUserLoggedIn) {
            return <Redirect to="/" />
        }
        else {
            return (
                <Container className="compensate-header">
                    <div className="centered-content login-container">
                        {this.renderAppropriateContentIfRedirect(this.props)}
                        <DismissibleAlert
                            variant="danger"
                            heading="Login Unsuccessful"
                            body={this.state.errorReason}
                            show={this.state.showErrorAlert}
                            onDismiss={() => this.setState({ showErrorAlert: false })}
                        />
                        <LoginForm onFormSubmit={this.onFormSubmit} />
                    </div>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.user.isLoggedIn,
    }
}

export default connect(mapStateToProps, { loginUser })(LoginContainer);
