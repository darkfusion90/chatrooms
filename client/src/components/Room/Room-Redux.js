import React from 'react';
import { connect } from 'react-redux'

import RoomContainer from './Room-Container'
import { setActiveRoom } from '../../redux/actions/room-actions'

const RoomRedux = ({ currentUserRoomMembership, ...props }) => {
    const isCurrentUserRoomMember = () => {
        return currentUserRoomMembership && currentUserRoomMembership.isRoomMember
    }
    
    return (
        <RoomContainer
            isCurrentUserRoomMember={isCurrentUserRoomMember()}
            {...props}
        />
    )
}


const mapStateToProps = (state) => {
    const { room, currentUserRoomMembership } = state.rooms.activeRoom

    return { room, currentUserRoomMembership }
}

export default connect(mapStateToProps, { setActiveRoom })(RoomRedux)
