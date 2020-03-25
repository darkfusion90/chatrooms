import React from 'react'

import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../../standalone/ProgressButton'
import RoomNotJoinedView from './RoomNotJoined-View'

class RoomNotJoinedContainer extends React.Component {
    state = { joinRoomProgress: PROGRESS_INITIAL }

    onJoinRoomButtonClick = () => {
        this.onJoinRoomPending()
        const { room, joinRoom } = this.props
        const roomId = room && room.roomId
        joinRoom(roomId, this.onJoinRoomSuccess, this.onJoinRoomFail)
    }

    onJoinRoomPending = () => {
        this.setState({ joinRoomProgress: PROGRESS_PENDING })
    }

    onJoinRoomSuccess = () => {
        this.setState({ joinRoomProgress: PROGRESS_SUCCESS })
    }

    onJoinRoomFail = () => {
        this.setState({ joinRoomProgress: PROGRESS_FAIL })
    }

    render() {
        return (
            <RoomNotJoinedView
                onJoinRoomButtonClick={this.onJoinRoomButtonClick}
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default RoomNotJoinedContainer