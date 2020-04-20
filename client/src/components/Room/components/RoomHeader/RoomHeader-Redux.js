import React from 'react';
import { connect } from 'react-redux'

import RoomHeaderView from './RoomHeader-View'


const RoomHeaderRedux = (props) => {
    return <RoomHeaderView {...props} />
}

const mapStateToProps = (state) => {
    const { currentUserRoomMembership } = state.rooms.activeRoom
    const membership = currentUserRoomMembership && currentUserRoomMembership.membership

    return {
        currentUserMemberId: membership && membership._id
    }
}

export default connect(mapStateToProps)(RoomHeaderRedux);
