import React from 'react';

import RoomListItemView from './RoomListItem-View'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../../standalone/ProgressButton'

class RoomListItemContainer extends React.Component {
    state = { joinRoomProgress: PROGRESS_INITIAL }

    onJoinRoomPending = () => {
        this.setState({ joinRoomProgress: PROGRESS_PENDING })
    }

    onJoinRoomSuccess = () => {
        this.setState({ joinRoomProgress: PROGRESS_SUCCESS })
    }

    onJoinRoomFailure = () => {
        this.setState({ joinRoomProgress: PROGRESS_FAIL })
    }

    onJoinRoomButtonClick = (roomId) => {
        this.onJoinRoomPending()
        this.props.joinRoom(roomId, this.onJoinRoomSuccess, this.onJoinRoomFailure)
    }

    render() {
        return (
            <RoomListItemView
                onJoinRoomButtonClick={this.onJoinRoomButtonClick}
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default RoomListItemContainer;
