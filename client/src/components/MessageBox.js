import React from 'react';

import serverApi from '../server-api/index';

class MessageBox extends React.Component {
    state = { message: '' }

    isNonEmptyMessage = () => {
        return this.state.message.trim().length !== 0;
    }

    onSendButtonClick = () => {
        if (this.isNonEmptyMessage()) {
            serverApi.sendMessage(this.state.message);
        }
        this.setState({ message: '' });
    }

    render() {
        return (
            <div className="ui action fluid input field">
                <input
                    type="text"
                    placeholder="Type a message to send..."
                    value={this.state.message}
                    onChange={(event) => this.setState({ message: event.target.value })}

                />
                <button
                    className="ui primary button"
                    onClick={this.onSendButtonClick}>
                    Send
                </button>
            </div>
        );
    }
}

export default MessageBox;