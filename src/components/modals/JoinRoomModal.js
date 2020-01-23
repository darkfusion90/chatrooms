import React from 'react';
import { connect } from 'react-redux';

import GenericModal from './GenericModal';
import tryJoiningRoom from '../../actions/tryJoiningRoom';

class JoinRoomModal extends React.Component {
    state = { inputValue: "", isFormLoading: false }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({ isFormLoading: true });
        this.props.tryJoiningRoom(
            this.state.inputValue,
            this.props.onSuccess,
            this.props.onPermissionPending,
            this.props.onJoinRoomPermissionRecieved,
            this.props.onFailure
        )
    }

    inputChanged = (e) => {
        this.setState({
            inputValue: e.target.value,
            errorMessage: null
        })
    }

    onCancelButtonClick = () => {
        this.setState({ inputValue: "", isFormLoading: false });
        this.props.hideModal();
    }

    getModalActions() {
        const disabled = this.state.isFormLoading ? "disabled" : "";
        return (
            <React.Fragment>
                <button className="ui button" onClick={this.onCancelButtonClick}>
                    Cancel
                </button>

                <button type="submit" form="join-room-form" className={`ui button orange ${disabled}`}>
                    Join
                </button>
            </React.Fragment>
        );
    }

    getModalContent() {
        const loading = this.state.isFormLoading ? "loading" : "";
        return (
            <form className={`ui form ${loading}`} id="join-room-form" onSubmit={this.onFormSubmit}>
                <div className="required field">
                    <label>Enter Room ID:</label>
                    <input
                        type="text"
                        placeholder="Room Number"
                        value={this.state.inputValue}
                        onChange={this.inputChanged}
                        autoFocus={true}
                        required={true}
                    />
                </div>
            </form>
        );
    }

    render() {
        return (
            <GenericModal
                header="Join Room"
                actions={this.getModalActions()}
                content={this.getModalContent()}
                {...this.props}
            />
        );
    }
}

export default connect(null, { tryJoiningRoom })(JoinRoomModal);
