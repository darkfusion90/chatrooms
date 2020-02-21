import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import GenericModal from './GenericModal';
import createRoom from '../../actions/createRoom';
import CreateRoomForm from '../forms/CreateRoomForm/';

import DismissibleAlert from '../Alerts/DismissibleAlert';

class CreateRoomModal extends React.Component {
    state = { alert: { show: false } }

    onFormSubmit = ({ roomName, roomType }) => {
        this.props.createRoom(roomName, roomType, this.onSuccess, this.onFailure);
    }

    onSuccess = () => {
        this.showAlert('success', "Your room was successfully created");
    }

    onFailure = (reason) => {
        this.showAlert('danger', "Oops! Your room couldn't be created");
    }

    showAlert = (variant, body) => {
        this.setState({
            alert:
            {
                show: true,
                variant: variant,
                body: body
            }
        })
    }

    hideAlert = () => {
        this.setState({ alert: { show: false } })
    }

    onCancelButtonClick = () => {
        this.hideAlert();
        this.props.hideModal();
    }

    getModalActions() {
        return (
            <>
                <Button variant='secondary' onClick={this.onCancelButtonClick}>Cancel</Button>
                <Button form='create-room-form' type='submit'>Create Room</Button>
            </>
        );
    }

    getAlertDismissAction = () => {
        if (!this.state.alert.show) {
            return null;
        }

        if (this.state.alert.variant === 'danger') {
            return null;
        }

        return (
            <Button
                variant='outline-success'
                onClick={() => {
                    this.hideAlert();
                    this.props.hideModal();
                }}
            >
                Back to home
            </Button>
        )
    }

    getModalContent() {
        return (
            <>
                <DismissibleAlert
                    {...this.state.alert}
                    onDismiss={this.hideAlert}
                    dismissAction={this.getAlertDismissAction}
                />
                <CreateRoomForm onFormSubmit={this.onFormSubmit} />
            </>
        )
    }

    render() {
        return (
            <>
                <GenericModal
                    header="Create Room"
                    actions={this.getModalActions()}
                    content={this.getModalContent()}
                    {...this.props}
                />
            </>
        );
    }
}

export default connect(
    null,
    { createRoom }
)(CreateRoomModal);

