import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import createRoom from '../../actions/createRoom';

class CreateRoomModal extends React.Component {
    state = { inputValue: "", radioSelectedValue: null, formInLoadingState: false }

    componentDidUpdate() {
        if (this.state.formInLoadingState && this.props.room) {
            this.setState({
                formInLoadingState: this.props.room.status !== 200
            })
            this.props.toggleModalVisibility();
        }
    }

    updateCheckedRadioInput = (e) => {
        this.setState({ radioSelectedValue: e.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const roomName = this.state.inputValue;
        const roomType = this.state.radioSelectedValue;
        this.props.createRoom(roomName, roomType);

        this.setState({
            formInLoadingState: true
        })
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
        const loading = this.state.formInLoadingState ? "loading" : "";
        return (
            <form className={`ui form ${loading}`} id="create-room-form" onSubmit={this.onFormSubmit}>
                <div className="required field">
                    <label>Enter Room Name:</label>
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={this.state.inputValue}
                        onChange={e => { this.setState({ inputValue: e.target.value }); }}
                        autoFocus={true}
                        required={true}
                    />
                </div>
                {this.renderRadioInputs()}
            </form>
        );
    }

    getModalActions() {
        return (
            <React.Fragment>
                <button className="ui button" >
                    Cancel
                </button>

                <button type="submit" className="ui button orange" form="create-room-form">
                    Create
                </button>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Modal
                header="Create Room"
                actions={this.getModalActions()}
                content={this.getModalContent()}
                toggleModalVisibility={this.props.toggleModalVisibility}
                visible={this.props.visible}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { room: state.room };
}

export default connect(mapStateToProps, { createRoom })(CreateRoomModal);

