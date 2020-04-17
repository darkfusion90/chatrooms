import React from 'react';

import RoomView from './Room-View';
import { connectToRoom, registerNewMessageListener } from '../../api/socketIo'
import sendMessage from '../../helpers/sendMessage'

class RoomContainer extends React.Component {
    state = { error: null }

    componentDidMount() {
        const { setActiveRoom, roomId } = this.props;

        registerNewMessageListener(roomId, () => setActiveRoom(roomId, this.onRoomFetchFail))
        setActiveRoom(roomId, () => { }, this.onRoomFetchFail)
    }

    componentDidUpdate() {
        const { room } = this.props
        if (room) {
            connectToRoom(room._id, () => { })
        }
    }

    onRoomFetchFail = ({ response }) => {
        this.setState({ error: response })
    }

    onSendMessageButtonClick = ({ message }) => {
        if (!message || message.trim().length === 0) {
            return null
        } else {
            const { room } = this.props
            sendMessage(room._id, message, this.onSendMessageSuccess, this.onSendMessageFailure)
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
        const { isCurrentUserRoomMember, room } = this.props

        return <RoomView
            room={room}
            isCurrentUserRoomMember={isCurrentUserRoomMember}
            onSendMessageButtonClick={this.onSendMessageButtonClick}
            {...this.state}
        />
    }
}

export default RoomContainer
