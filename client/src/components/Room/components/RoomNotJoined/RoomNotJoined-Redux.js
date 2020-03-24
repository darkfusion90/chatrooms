import React from 'react'
import { connect } from 'react-redux'

import {
    joinRoom
} from '../../../../redux/actions/room-actions'
import RoomNotJoinedContainer from './RoomNotJoined-Container'

const RoomNotJoinedRedux = (props) => {
    return (
        <RoomNotJoinedContainer
            joinRoom={props.joinRoom}
        />
    )
}

export default connect(null, { joinRoom })(RoomNotJoinedRedux)