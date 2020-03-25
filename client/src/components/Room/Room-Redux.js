import React from 'react';
import { connect } from 'react-redux'

import RoomContainer from './Room-Container'
import { fetchRoom } from '../../redux/actions/room-actions'

const RoomRedux = (props) => {
    return <RoomContainer {...props} />;
}


const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.user && state.user.user,
        room: state.rooms[ownProps.roomId]
    }
}

export default connect(mapStateToProps, { fetchRoom })(RoomRedux)
