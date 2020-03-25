import React from 'react';

import RoomView from './Room-View';
import { connectToRoom, registerNewMessageListener } from '../../server-communication/socketServer'
import sendMessage from '../../helpers/sendMessage'

class RoomContainer extends React.Component {
    state = { error: null }

    componentDidMount() {
        const { fetchRoom, roomId } = this.props;
        console.log('roomId: ', roomId)
        registerNewMessageListener(roomId, (data) => {
            console.log("new message: ", data)
            fetchRoom(roomId, this.onRoomFetchSuccess, this.onRoomFetchFail)
        })
        fetchRoom(roomId, () => { }, this.onRoomFetchFail)
    }

    componentDidUpdate() {
        const { room } = this.props
        if (room) {
            connectToRoom(room.roomId, () => { })
        }
    }

    onRoomFetchFail = ({ response }) => {
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
        const { currentUser, room } = this.props

        return <RoomView
            currentUser={currentUser}
            room={room}
            onSendMessageButtonClick={this.onSendMessageButtonClick}
            {...this.state}
        />;
    }
}

export default RoomContainer
