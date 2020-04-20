import React from 'react';
import _ from 'lodash'

import RoomView from './Room-View';
import { connectToRoom } from '../../api/socketIo'
import sendMessage from '../../helpers/sendMessage'

class RoomContainer extends React.Component {
    state = { error: null }

    componentDidMount() {
        const { setActiveRoom, roomId } = this.props;

        setActiveRoom(roomId, this.onRoomFetchFail)
    }

    componentDidUpdate(prevProps) {
        const {
            room,
            updateCurrentUserRoomMembership,
            currentUserId
        } = this.props
        const roomId = room && room._id

        connectToRoom(roomId, () => { })

        if (this.shouldUpdateCurrentUserRoomMembership(prevProps)) {
            updateCurrentUserRoomMembership(roomId, currentUserId)
        }
    }

    didRoomChange = (prevProps) => {
        return !_.isEqual(prevProps.room, this.props.room)
    }

    didUserChange = (prevProps) => {
        const { currentUserId: prevUserId } = prevProps
        return prevUserId !== this.props.currentUserId
    }

    didUserRoomMembershipChange = (prevProps) => {
        const { currentUserRoomMembership: prevMembership } = prevProps
        return !_.isEqual(prevMembership, this.props.currentUserRoomMembership)
    }

    shouldUpdateCurrentUserRoomMembership = (prevProps) => {
        const isUserKnown = () => {
            //currentUserId is undefined for an unknown user 
            //which usually happens when the redux store is not completely updated with user data
            //hence, simply using the truthy/falsy value
            return this.props.currentUserId
        }

        const didDependentDataChange = () => {
            return (
                this.didRoomChange(prevProps) ||
                this.didUserChange(prevProps) ||
                this.didUserRoomMembershipChange(prevProps)
            )
        }

        return isUserKnown() && didDependentDataChange()
    }

    onRoomFetchFail = ({ response }) => {
        this.setState({ error: response })
    }

    onSendMessageButtonClick = ({ message }) => {
        this.sendMessage(message)
    }

    sendMessage(message) {
        if (!message || message.trim().length === 0) {
            return null
        } else {
            const { room } = this.props
            sendMessage(room._id, message, this.onSendMessageSuccess, this.onSendMessageFailure)
        }
    }

    onSendMessageSuccess = (response) => {
        console.log('message sent: ', response)
    }

    onSendMessageFailure = ({ response }) => {
        //TODO: Message send failure should be addressed using separate state field
        //As of now, if any error occurs, it will simply be treated as a "room-error"
        //and appropriate message shown (e.g. "Room not found" or "Forbidden")
        //which is misleading and inappropriate
        this.setState({ error: response })
    }

    handleTextInputKeyDown = (event) => {
        const ENTER_BUTTON_KEY_CODES = [10, 13]
        const isEnterKeyDown = () => ENTER_BUTTON_KEY_CODES.includes(event.keyCode)

        if ((event.ctrlKey || event.metaKey) && isEnterKeyDown()) {
            this.sendMessage(this.props.currentMessage)
            this.props.resetChatMessageForm()
        }
    }

    render() {
        const {
            currentUserRoomMembership,
            room,
            roomId
        } = this.props

        const isCurrentUserRoomMember = () => {
            return currentUserRoomMembership && currentUserRoomMembership.isRoomMember
        }

        return <RoomView
            roomId={roomId}
            room={room}
            isCurrentUserRoomMembershipUndetermined={_.isEmpty(currentUserRoomMembership)}
            isCurrentUserRoomMember={isCurrentUserRoomMember()}
            onSendMessageButtonClick={this.onSendMessageButtonClick}
            onTextInputKeyDown={this.handleTextInputKeyDown}
            {...this.state}
        />
    }
}

export default RoomContainer
