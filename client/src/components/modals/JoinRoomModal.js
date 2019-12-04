import React from 'react';

import Modal from './Modal';

class JoinRoomModal extends React.Component {
    state = { inputValue: "" }

    getModalContent() {
        return (
            <div className="ui form">
                <div className="field">
                    <label>Enter Room ID:</label>
                    <input
                        type="text"
                        placeholder="Room Number"
                        value={this.state.inputValue}
                        onChange={e => { this.setState({ inputValue: e.target.value }); }}
                        autoFocus={true}
                    />
                </div>
            </div>
        );
    }

    getModalActions() {
        return (
            <React.Fragment>
                <button className="ui button" >
                    Cancel
                </button>
                
                <button className="ui button orange" onClick={this.onClickJoinButton}>
                    Join
                </button>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Modal
                header="Join Room"
                actions={this.getModalActions()}
                content={this.getModalContent()}
                toggleModalVisibility={this.props.toggleModalVisibility}
                visible={this.props.visible}
            />
        );
    }
}

export default JoinRoomModal;
