import React from 'react';

import CreateRoomModalView from './CreateRoomModal-View'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'

class CreateRoomModalContainer extends React.Component {
    state = { createRoomProgress: PROGRESS_INITIAL }

    onCreateRoomPending = () => {
        this.setState({ createRoomProgress: PROGRESS_PENDING })
    }

    onCreateRoomSuccess = () => {
        this.setState({ createRoomProgress: PROGRESS_SUCCESS })
    }

    onCreateRoomFailure = () => {
        this.setState({ createRoomProgress: PROGRESS_FAIL })
    }

    onFormSubmit = ({ roomName, roomType }) => {
        this.onCreateRoomPending()
        const { createRoom } = this.props
        createRoom(roomName, roomType, this.onCreateRoomSuccess, this.onCreateRoomFailure)
    }

    render() {
        return <CreateRoomModalView onFormSubmit={this.onFormSubmit} {...this.state} {...this.props} />
    }
}

export default CreateRoomModalContainer

