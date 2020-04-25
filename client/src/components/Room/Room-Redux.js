import React from 'react';
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import RoomContainer from './Room-Container'
import {
    setActiveRoom,
    resetActiveRoom,
    updateCurrentUserRoomMembership
} from '../../redux/actions/room-actions'
import { setDocumentTitle } from '../../redux/actions/helmet-actions'


const RoomRedux = ({ chatMessageForm, ...props }) => {

    const getCurrentMessage = () => {
        const formValues = chatMessageForm && chatMessageForm.values
        return formValues && formValues.message
    }

    return (
        <RoomContainer
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
    setDocumentTitle,
    resetActiveRoom,
    resetChatMessageForm: () => reset('chat-message-form')
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomRedux)
