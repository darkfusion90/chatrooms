import React from 'react';
import { connect } from 'react-redux';

import recieveMessage from '../../actions/recieveMessage';
import serverApi from '../../server-api';

import './ChatHistory.css';

class ChatHistory extends React.Component {
    state = { callbacksRegistered: false }

    componentDidUpdate() {
        if (!this.state.callbacskRegistered && this.props.serverConnection.connected) {
            registerCallbacks();
        }
    }

    registerCallbacks() {
        serverApi.onMessageRecieved(this.onMessageRecieved);
        serverApi.onRoomJoined(this.onRoomJoined);

        this.setState({ callbacksRegistered: true })
    }

    onMessageRecieved = (messageMeta) => {
        this.props.recieveMessage(messageMeta);
    }

    onRoomJoined = () => {

    }

    currentUserIsMessageAuthor(senderId) {
        const currentUserId = this.props.serverConnection.webSocket.id;
        return currentUserId === senderId;
    }

    determineAlignmentStyle(senderId) {
        if (this.currentUserIsMessageAuthor(senderId)) {
            return 'right-aligned';
        } else {
            return 'left-aligned';
        }
    }

    renderMessage(messageMeta) {
        const { senderId, message } = messageMeta;
        console.log("MESSAGE: " + message)
        console.log("SENDER: " + senderId)
        console.log("ME: " + this.props.serverConnection.webSocket.id)

        const alignStyle = this.determineAlignmentStyle(senderId);
        return (
            <div className={`message-container ${alignStyle}`}>
                <p className="message">{message}</p>
            </div>
        );
    }

    renderChatList() {
        return (
            <div className="chat-list">
                {this.props.messages.map(messageMeta => {
                    return this.renderMessage(messageMeta)
                }
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="chat-history">
                <div className="chat-list-container">
                    {this.renderChatList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { serverConnection: state.serverConnection, messages: state.messages };
}

export default connect(
    mapStateToProps,
    { recieveMessage }
)(ChatHistory);
