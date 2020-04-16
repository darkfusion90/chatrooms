import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import RoomListItemActionsContainer from './RoomListItemActions-Container'
import {
    joinRoom,
    updateCurrentUserRoomMembership
} from '../../../../redux/actions/room-actions/'


const RoomListItemActionsRedux = ({
    room,
    joinRoom,
    currentUser,
    currentUserRoomMembership,
    updateCurrentUserRoomMembership
}) => {

    useEffect(() => {
        if (!currentUser.user._id) return
        
        updateCurrentUserRoomMembership(room._id, currentUser.user._id)
    }, [currentUser, room, updateCurrentUserRoomMembership])

    return (
        <RoomListItemActionsContainer
            room={room}
            joinRoom={joinRoom}
            currentUserRoomMembership={currentUserRoomMembership}
        />
    )
}

const mapStateToProps = (state, ownProps) => {
    const { user: currentUser, rooms: { currentUserRoomMemberships } } = state

    return {
        currentUserRoomMembership: currentUserRoomMemberships[ownProps.room._id],
        currentUser,
    }
}

export default connect(
    mapStateToProps,
    { updateCurrentUserRoomMembership, joinRoom }
)(RoomListItemActionsRedux)
