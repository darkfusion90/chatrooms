import React from 'react';

import CreateRoomModalRedux from './CreateRoomModal-Redux'

class CreateRoomModalContainer extends React.Component {
    state = { alert: { show: false, variant: null, body: null } }

    showAlert = (variant, body) => {
        this.setState({ alert: { show: true, variant, body } })
    }

    hideAlert = () => {
        this.setState({ alert: { show: false } })
    }

    onCreateRoomSuccess = () => {
        this.showAlert('success', "Your room was successfully created");
    }

    onCreateRoomFailure = () => {
        this.showAlert('danger', "Oops! Your room couldn't be created");
    }

    render() {
        const { alert } = this.state

        return (
            <CreateRoomModalRedux
                alertProps={alert}
                hideAlert={this.hideAlert}
                onCreateRoomSuccess={this.onCreateRoomSuccess}
                onCreateRoomFailure={this.onCreateRoomFailure}
            />
        );
    }
}

export default CreateRoomModalContainer

