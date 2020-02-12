import React from 'react';

import LoginForm from '../../components/forms/LoginForm'

class LoginContainer extends React.Component {
    onFormSubmit = (formValues) => {
        console.log("Login Container values: ", formValues)
    }

    render() {
        return <LoginForm onFormSubmit={this.onFormSubmit} />
    }
}

export default LoginContainer;
