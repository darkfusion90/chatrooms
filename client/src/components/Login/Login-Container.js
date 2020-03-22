import React from 'react';

import LoginRedux from './Login-Redux';

class LoginContainer extends React.Component {
    state = {
        errorReason: null,
        shouldShowErrorAlert: false,
    }

    onLoginFailure = ({ response }) => {
        this.setState({
            errorReason: response.data.reason,
            shouldShowErrorAlert: true
        })
    }

    onErrorAlertDismissed = () => {
        this.setState({ shouldShowErrorAlert: false })
    }

    render() {
        return (
            <LoginRedux
                onLoginFailure={this.onLoginFailure}
                onErrorAlertDismissed={this.onErrorAlertDismissed}
                {...this.state}
            />
        )
    }
}

export default LoginContainer;
