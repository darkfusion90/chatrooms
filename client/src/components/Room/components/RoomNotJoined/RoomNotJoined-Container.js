import React from 'react'

import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../../standalone/ProgressButton'
import RoomNotJoinedView from './RoomNotJoined-View'

class RoomNotJoinedContainer extends React.Component {
    state = { joinRoomStatus: PROGRESS_INITIAL }

    onJoinRoomButtonClick = () => {
        this.onJoinRoomPending()
        const { room, joinRoom } = this.props
        const roomId = room && room.roomId
        joinRoom(roomId, this.onJoinRoomSuccess, this.onJoinRoomFail)
    }

    onJoinRoomPending = () => {
        this.setState({ joinRoomStatus: PROGRESS_PENDING })
    }

    onJoinRoomSuccess = () => {
        this.setState({ joinRoomStatus: PROGRESS_SUCCESS })
    }

    onJoinRoomFail = () => {
        this.setState({ joinRoomStatus: PROGRESS_FAIL })
    }

    render() {
        return (
            <RoomNotJoinedView
                {...this.props}
                {...this.state}
                onJoinRoomButtonClick={this.onJoinRoomButtonClick}
            />
        )
    }
}

export default RoomNotJoinedContainer