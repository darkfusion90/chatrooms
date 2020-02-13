import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LoginForm from '../../components/forms/LoginForm';
import loginUser from '../../actions/loginUser';

import './LoginContainer.scss';

class LoginContainer extends React.Component {
    state = { loginAttemptStatus: "unknown" }

    onLoginSuccess = () => {
        this.setState({ loginAttemptStatus: "success" })
    }

    onLoginFailure = () => {
        this.setState({ loginAttemptStatus: "failure" })
    }

    onFormSubmit = (formValues) => {
        console.log("Login Container values: ", formValues)
        this.props.loginUser(
            formValues.username,
            formValues.password,
            this.onLoginSuccess,
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
                        <LoginForm onFormSubmit={this.onFormSubmit} />
                    </Container>
                </div>
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
