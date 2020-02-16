import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import GenericModal from './GenericModal';
import tryCreatingRoom from '../../actions/tryCreatingRoom';
import CreateRoomForm from '../forms/CreateRoomForm';

class CreateRoomModal extends React.Component {
    state = { inputValue: "", radioSelectedValue: null, isFormLoading: false }

    updateCheckedRadioInput = (e) => {
        this.setState({ radioSelectedValue: e.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const roomName = this.state.inputValue;
        const roomType = this.state.radioSelectedValue;
        this.props.tryCreatingRoom(roomName, roomType, this.onSuccess, this.onFailure);
        this.setState({ isFormLoading: true });
    }

    restoreInitialState = () => {
        this.setState({ inputValue: "", radioSelectedValue: null, isFormLoading: false });
    }

    onSuccess = () => {
        this.restoreInitialState();
        this.props.onSuccess();
    }

    onFailure = (reason) => {
        this.restoreInitialState();
        this.props.onFailure(reason);
    }

    onTextInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    onCancelButtonClick = () => {
        this.restoreInitialState();
        this.props.hideModal();
    }

    renderRadioInputs() {
        return (
            <div className="required field">
                <label>Select Room type:</label>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" value="public" name="room-type" tabIndex="0" required onChange={(e) => this.updateCheckedRadioInput(e)} />
                        <label>
                            <i className="globe icon" /> Public
                        </label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" value="unlisted" name="room-type" tabIndex="0" onChange={(e) => this.updateCheckedRadioInput(e)} />
                        <label>
                            <i className="paperclip icon" /> Unlisted
                        </label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input type="radio" value="private" name="room-type" tabIndex="0" onChange={(e) => this.updateCheckedRadioInput(e)} />
                        <label>
                            <i className="lock icon" /> Private
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    getModalContent() {
        return (
            <Form onSubmit={this.onFormSubmit} id="create-rom-form">
                <Form.Label><strong>Enter Room Name:</strong></Form.Label>
                <Form.Control
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.onTextInputChange}
                    required={true}
                />
                {this.renderRadioInputs()}
            </Form>
        );
    }

    renderCreateRoomButton() {
        const spinner = <Spinner
            style={{ marginRight: "10px" }}
            as="span"
            animation="border"
            role="status"
            size="sm"
        />;

        const disabled = this.state.isFormLoading ? "disabled" : "";
        return (
            <button
                type="submit"
                className={`ui button orange ${disabled}`}
                form="create-room-form"
            >
                {this.state.isFormLoading ? spinner : null}
                Create
            </button>
        );
    }

    getModalActions() {
        return (
            <React.Fragment>
                <button className="ui button" onClick={this.onCancelButtonClick}>
                    Cancel
                </button>

                {this.renderCreateRoomButton()}
            </React.Fragment>
        );
    }

    render() {
        return (
            <GenericModal
                header="Create Room"
                actions={this.getModalActions()}
                content={<CreateRoomForm />}
                {...this.props}
            />
        );
    }
}

export default connect(
    null,
    { tryCreatingRoom }
)(CreateRoomModal);

