import React from 'react';
import { connect } from 'react-redux'

import RoomContainer from './Room-Container'
import { fetchRoom } from '../../redux/actions/room-actions'

const RoomRedux = (props) => {
    //TODO: When directly visiting a room's url, the store gets confusingly malfunctioned
    //Example: On clicking join, the component is not updated and it remains same
    //i.e., with the "Joined Room" button instead of reloading and showing the room window
    //Upon inspecting, the redux store seems to consider the user as the member of the room
    //However, as stated, the component doesn't seems to do the same and still shows the 
    //Room not joined screen with the green (successful) "Room Joined" button
    return <RoomContainer {...props} />;
}


const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.user && state.user.user,
        room: state.rooms[ownProps.roomId]
    }
}

export default connect(mapStateToProps, { fetchRoom })(RoomRedux)
