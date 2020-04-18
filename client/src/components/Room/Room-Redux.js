import React from 'react';
import isEmpty from 'is-empty'
import { connect } from 'react-redux'

import RoomContainer from './Room-Container'
import {
    setActiveRoom,
    updateCurrentUserRoomMembership
} from '../../redux/actions/room-actions'

const RoomRedux = ({ currentUserRoomMembership, ...props }) => {
    const isCurrentUserRoomMember = () => {
        return currentUserRoomMembership && currentUserRoomMembership.isRoomMember
    }

    return (
        <RoomContainer
            isCurrentUserRoomMembershipUndetermined={isEmpty(currentUserRoomMembership)}
            isCurrentUserRoomMember={isCurrentUserRoomMember()}
            {...props}
        />
    )
}


const mapStateToProps = (state) => {
    const { user } = state.user
    const { room, currentUserRoomMembership } = state.rooms.activeRoom

    return { currentUserId: user && user._id, room, currentUserRoomMembership }
}

export default connect(
    mapStateToProps,
    { setActiveRoom, updateCurrentUserRoomMembership }
)(RoomRedux)
