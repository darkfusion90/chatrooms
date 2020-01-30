import React from 'react';

import './LandingPage.scss';
import LandingPage from './LandingPage';

class LandingPageContainer extends React.Component {
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
        this.setState({
            shouldShowSnackbar: false,
            snackbarVariant: "info",
            snackbarMessage: ""
        })
    }

    getModalProps() {
        return {
            name: this.state.modalName,
            hideModal: this.hideModal,
            visible: this.state.shouldShowModal,
            onSuccess: this.onSuccess,
            onFailure: this.onFailure,
            onPermissionPending: this.onJoinRoomPermissionPending
        }
    }

    getSnackbarProps(){
        return {
            onClose: this.onSnackbarClose,

        }
    }

    render() {
        return (
            <LandingPage
                modalProps={this.getModalProps()}
                onCreateRoomButtonClick={() => this.showModal('create')}
                onJoinRoomButtonClick={() => this.showModal('join')} 
            />
        );
    }
}

export default LandingPageContainer;