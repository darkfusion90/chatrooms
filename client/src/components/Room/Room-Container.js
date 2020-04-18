import React from 'react';
import _ from 'lodash'

import RoomView from './Room-View';
import { connectToRoom } from '../../api/socketIo'
import sendMessage from '../../helpers/sendMessage'

class RoomContainer extends React.Component {
    state = { error: null }

    componentDidMount() {
        const { setActiveRoom, roomId } = this.props;

        setActiveRoom(roomId, () => { }, this.onRoomFetchFail)
    }

    didRoomChange = (prevProps) => {
        return !_.isEqual(prevProps.room, this.props.room)
    }

    didUserChange = (prevProps) => {
        const { currentUserId: prevUserId } = prevProps
        return prevUserId !== this.props.currentUserId
    }

    componentDidUpdate(prevProps) {
        const {
            room,
            updateCurrentUserRoomMembership,
            currentUserId
        } = this.props
        const roomId = room && room._id

        if (this.didRoomChange(prevProps)) {
            connectToRoom(roomId, () => { })
            updateCurrentUserRoomMembership(roomId, currentUserId)
        }

        if (this.didUserChange(prevProps)) {
            updateCurrentUserRoomMembership(roomId, currentUserId)
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
        const {
            isCurrentUserRoomMembershipUndetermined,
            isCurrentUserRoomMember,
            room
        } = this.props

        return <RoomView
            room={room}
            isCurrentUserRoomMembershipUndetermined={isCurrentUserRoomMembershipUndetermined}
            isCurrentUserRoomMember={isCurrentUserRoomMember}
            onSendMessageButtonClick={this.onSendMessageButtonClick}
            {...this.state}
        />
    }
}

export default RoomContainer
