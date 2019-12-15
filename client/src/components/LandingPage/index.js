import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CreateRoomModal from '../modals/CreateRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';
import SnackbarContainer from '../SnackbarContainer';

import './LandingPage.css';
import serverApi from '../../server-api';

class LandingPage extends React.Component {
    state = {
        shouldShowSnackbar: false,
        snackbarMessage: "",
        snackbarVariant: "info",
        shouldShowModal: false,
        modalName: null
    }

    capitalizeFirstWord = (sentence) => {
        //"sentence &&" handles undefined or an empty sentence
        return sentence && sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }

    getSuccessMessage = (actionType) => {
        switch (actionType) {
            case "create-room":
                return "Room created Successfully!";
            case "join-room":
                return "Room joined Successfully!";
            default:
                return "Operation Successful!";
        }
    }

    getFailureMessage = (actionType, failureReason) => {
        failureReason = this.capitalizeFirstWord(failureReason);
        switch (actionType) {
            case "create-room":
                return `Failed to create Room! Reason: ${failureReason}`;
            case "join-room":
                return `Failed to join Room! Reason: ${failureReason}`;
            default:
                return "Operation Failed!";
        }
    }

    onSuccess = (actionType) => {
        console.log("landing page on success callback")
        this.hideModal();
        const successMessage = this.getSuccessMessage(actionType);
        this.showSnackbar("success", successMessage);
    }

    onFailure = (actionType, reason) => {
        console.log("landing page on failure callback")
        this.hideModal();
        const failureMessage = this.getFailureMessage(actionType, reason);
        this.showSnackbar("error", failureMessage);
    }

    onJoinRoomPermissionPending = () => {
        console.log('mewo')
        this.showSnackbar("info", "Private Room. Waiting for permission from Room owner");
    }

    onJoinRoomPermissionRecieved = (permissionStatus) => {
        if (permissionStatus === "ok") {
            this.hideModal();
            this.showSnackbar("success", "Room access permission granted!");
        } else {
            this.hideModal();
            this.showSnackbar("error", "Room access permission rejected!");
        }
    }

    showModal = (modalName) => {
        this.setState({
            shouldShowModal: true,
            modalName: modalName
        })
    }

    renderModals() {
        const createRoomModalInstance =
            <CreateRoomModal
                hideModal={this.hideModal}
                visible={this.state.shouldShowModal}
                onSuccess={() => this.onSuccess("create-room")}
                onFailure={reason => this.onFailure("create-room", reason)}
            />;

        const joinRoomModalInstance =
            <JoinRoomModal
                hideModal={this.hideModal}
                visible={this.state.shouldShowModal}
                onSuccess={() => this.onSuccess("join-room")}
                onFailure={reason => this.onFailure("join-room", reason)}
                onPermissionPending={this.onJoinRoomPermissionPending}
            />

        return this.state.modalName === 'create' ? createRoomModalInstance : joinRoomModalInstance;
    }

    renderButtons() {
        return (
            <div className="ui large orange buttons">
                <button className="ui button" onClick={() => this.showModal('create')}>
                    Create Room
                            </button>
                <div className="or"></div>
                <button className="ui button" onClick={() => this.showModal('join')}>
                    Join Room
                </button>
            </div>
        );
    }

    hideModal = () => {
        this.setState({
            shouldShowModal: false
        })
    }

    showSnackbar = (variant, message) => {
        this.setState({
            shouldShowSnackbar: true,
            snackbarVariant: variant,
            snackbarMessage: message
        })
    }

    onSnackbarClose = () => {
        console.log('mew')
        this.setState({
            shouldShowSnackbar: false,
            snackbarVariant: "info",
            snackbarMessage: ""
        })
    }

    getSnackbarActions() {
        return (
            <IconButton key="close" color="inherit" onClick={this.onSnackbarClose}>
                <CloseIcon style={{ fontSize: "20" }} />
            </IconButton>
        );
    }

    render() {
        return (
            <div className="landing-page">
                <div className="inner-wrapper">
                    <p>Welcome to Chatrooms!</p>

                    <div className="buttons-container">
                        {this.renderButtons()}
                    </div>
                </div>
                {this.renderModals()}
                <SnackbarContainer
                    header="hehehe"
                    message={this.state.snackbarMessage}
                    show={this.state.shouldShowSnackbar}
                    onClose={this.onSnackbarClose}
                    variant={this.state.snackbarVariant}
                    actions={this.getSnackbarActions()}
                    autoHideDuration={3000} />
            </div>
        );
    }
}

export default LandingPage;