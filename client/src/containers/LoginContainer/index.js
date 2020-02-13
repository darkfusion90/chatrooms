import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LoginForm from '../../components/forms/LoginForm';
import loginUser from '../../actions/loginUser';
import DismissibleAlert from '../../components/Alerts/DismissibleAlert'

import './LoginContainer.scss';

class LoginContainer extends React.Component {
    state = {
        hasLoginError: false,
        errorReason: null,
        showAlert: false
    }

    onLoginFailure = (reason) => {
        console.log("LoginContainer onLoginFailure: ", reason.response);
        this.setState({
            hasLoginError: true,
            errorReason: reason.response.data.message,
            showAlert: true
        })
    }

    onFormSubmit = (formValues) => {
        console.log("Login Container values: ", formValues)
        this.props.loginUser(
            formValues.username,
            formValues.password,
            this.onLoginFailure
        );
    }

    render() {
        console.log("STATE: ", this.state)

        if (this.props.isUserLoggedIn) {
            return <Redirect to="/" />
        }
        else {
            return (
                <div className="login-page-container">
                    <Container>
                        <DismissibleAlert
                            variant="danger"
                            heading="Login Unsuccessful"
                            body={this.state.errorReason}
                            show={this.state.showAlert}
                            onDismiss={() => this.setState({ showAlert: false })}
                        />
                        <LoginForm onFormSubmit={this.onFormSubmit} />
                    </Container>
                </div >
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.user.loggedIn,
    }
}

export default connect(mapStateToProps, { loginUser })(LoginContainer);
