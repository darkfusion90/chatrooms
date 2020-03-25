import React from 'react'

import JoinRoomModalView from './JoinRoomModal-View'

import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'


class JoinRoomModalContainer extends React.Component {
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

    onJoinRoomFormSubmit = ({ roomId }) => {
        this.onJoinRoomPending()
        console.log('to join: ', roomId)
        this.props.joinRoom(roomId, this.onJoinRoomSuccess, this.onJoinRoomFailure)
    }

    render() {
        return (
            <JoinRoomModalView
                onFormSubmit={this.onJoinRoomFormSubmit}
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default JoinRoomModalContainer