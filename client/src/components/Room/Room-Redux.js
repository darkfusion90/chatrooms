import React from 'react';
import isEmpty from 'is-empty'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import RoomContainer from './Room-Container'
import {
    setActiveRoom,
    updateCurrentUserRoomMembership
} from '../../redux/actions/room-actions'

const RoomRedux = ({ currentUserRoomMembership, chatMessageForm, ...props }) => {
    const isCurrentUserRoomMember = () => {
        return currentUserRoomMembership && currentUserRoomMembership.isRoomMember
    }

    const getCurrentMessage = () => {
        const formValues = chatMessageForm && chatMessageForm.values
        return formValues && formValues.message
    }

    return (
        <RoomContainer
            isCurrentUserRoomMembershipUndetermined={isEmpty(currentUserRoomMembership)}
            isCurrentUserRoomMember={isCurrentUserRoomMember()}
            currentMessage={getCurrentMessage()}
            {...props}
        />
    )
}


const mapStateToProps = (state) => {
    const { user } = state.user
    const { room, currentUserRoomMembership } = state.rooms.activeRoom

    return {
        currentUserId: user && user._id,
        chatMessageForm: state.form['chat-message-form'],
        room,
        currentUserRoomMembership
    }
}

const mapDispatchToProps = {
    setActiveRoom,
    updateCurrentUserRoomMembership,
    resetChatMessageForm: () => reset('chat-message-form')
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomRedux)
