import React from 'react';

import RoomView from './Room-View';
import { getRoom } from '../../server-communication/httpServer'
import { connectToRoom, registerNewMessageListener } from '../../server-communication/socketServer'
import sendMessage from '../../helpers/sendMessage'

class RoomContainer extends React.Component {
    state = {
        room: null,
        error: null
    }

    componentDidMount() {
        const { roomId } = this.props.match.params;
        registerNewMessageListener(roomId, (data) => {
            console.log("new message: ", data)
            getRoom(roomId, this.onRoomFetchSuccess, this.onRoomFetchFail)
        })
        getRoom(roomId, this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    componentDidUpdate() {
        const { room } = this.state
        if (room) {
            connectToRoom(room.roomId, function (err) {
                console.log('room connect callback: ', err)
            })
        }
    }

    onRoomFetchSuccess = (response) => {
        console.log('success room fetch: ', response)
        this.setState({ room: response.data, error: null })
    }

    onRoomFetchFail = ({ response }) => {
        console.log('fail room fetch: ', response)
        this.setState({ error: response })
    }

    onSendMessageButtonClick = (formValues) => {
        const { message } = formValues
        if (!message || message.trim().length === 0) {
            return null
        } else {
            const { room } = this.state
            sendMessage(room.roomId, message, this.onSendMessageSuccess, this.onSendMessageFailure)
        }
    }

    onSendMessageSuccess = (response) => {
        this.setState({ room: response.data })
    }

    onSendMessageFailure = ({ response }) => {
        //TODO: Message send failure should be addressed using separate state field
        //As of now, if any error occurs, it will simply be treated as a "room-error"
        //and appropriate message shown (e.g. "Room not found" or "Forbidden")
        //which is misleading and inappropriate
        this.setState({ error: response })
    }

    render() {
        const { room, error } = this.state;
        return <RoomView
            error={error}
            room={room}
            onSendMessageButtonClick={this.onSendMessageButtonClick}
        />;
    }
}

export default RoomContainer
