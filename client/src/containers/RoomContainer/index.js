import React from 'react';
import { Spinner } from 'react-bootstrap'

import Room from '../../components/Room';
import Forbidden from '../../components/errors/Forbidden'
import PageNotFound from '../../components/errors/PageNotFound'
import { getRoom } from '../../server-communication/httpServer'
import { connectToRoom, registerNewMessageListener } from '../../server-communication/socketServer'
import sendMessage from '../../helpers/sendMessage'

class RoomContainer extends React.Component {
    state = {
        room: null,
        error: null
    }

    componentDidMount() {
        const { roomId } = this.props;
        registerNewMessageListener(roomId, (data) => {
            console.log("new message: ", data)
            getRoom(roomId, this.onRoomFetchSuccess, this.onRoomFetchFail)
        })
        getRoom(roomId, this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    componentDidUpdate() {
        const { room } = this.state
        if (room) {
            connectToRoom(room.roomId, function (err) {
                console.log('room connect callback: ', err)
            })
        }
    }

    onRoomFetchSuccess = (response) => {
        this.setState({ room: response.data, error: null })
    }

    onRoomFetchFail = ({ response }) => {
        this.setState({ error: response })
    }

    renderError() {
        const { status } = this.state.error;
        if (status === 403) {
            return <Forbidden msg='User not allowed' />
        }
        else if (status === 404) {
            return <PageNotFound />
        }

        return <div>Unexpected Error</div>
    }

    onSendMessageButtonClick = (formValues) => {
        const { message } = formValues
        if (!message || message.trim().length === 0) {
            return null
        } else {
            const { room } = this.state
            sendMessage(room.roomId, message, this.onSendMessageSuccess, this.onSendMessageFailure)
        }
    }

    onSendMessageSuccess = (response) => {
        this.setState({ room: response.data })
    }

    onSendMessageFailure = ({ response }) => {
        this.setState({ error: response })
    }

    render() {
        const { room, error } = this.state;
        if (room) {
            return <Room room={room} onSendMessageButtonClick={this.onSendMessageButtonClick} />;
        }

        if (error) {
            return this.renderError()
        }

        return (
            <div className='centered-content'>
                <h2>Please wait while your Room is loading...</h2>
                <Spinner animation='border' size='xl' />
            </div>
        );
    }
}

export default RoomContainer
