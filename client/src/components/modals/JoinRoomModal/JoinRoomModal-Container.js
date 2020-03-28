import React from 'react'

import JoinRoomModalView from './JoinRoomModal-View'

import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'
import { getRoom } from '../../../server-communication/httpServer'
import isRoomMember from '../../../helpers/isRoomMember'

class JoinRoomModalContainer extends React.Component {
    state = {
        joinRoomProgress: PROGRESS_INITIAL,
        roomAlreadyJoinedError: null
    }

    componentDidUpdate() {
        if (this.state.roomAlreadyJoinedError) {
            return
        }

        const { joinRoomFormData, currentUserId } = this.props
        const form = joinRoomFormData ? joinRoomFormData : {}
        const formHasErrors = form.syncErrors || form.asyncErrors || form.asyncValidating

        if (!formHasErrors) {
            const roomId = form.values && form.values.roomId

            getRoom(roomId).then(response => {
                const room = response.data
                if (isRoomMember(room, currentUserId)) {
                    this.setState({ roomAlreadyJoinedError: 'You are already a member of this room' })
                }
            }).catch()
        }
    }

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