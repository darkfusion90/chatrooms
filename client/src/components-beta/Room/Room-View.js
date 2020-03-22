import React from 'react';
import { Spinner } from 'react-bootstrap'

import { ChatMessageForm, ChatWindow, RoomHeader } from './components'
import './Room-Style.scss'

const renderLoadingRoom = () => {
    return (
        <div className='centered-content'>
            <h2>Please wait while the Room is loading...</h2>
            <Spinner size='lg' animation='border' />
        </div>
    );
}

const renderErrorScreen = (error) => {
    //TODO:
    //Make components like <RoomNotFound room-{room} />
    //Use <PageNotFound />, etc inside those components providing appropriate messages
    switch (error.status) {
        default:
            return <div>Unexpected Error</div>
    }
}

const renderRoom = (room, onSendMessageButtonClick) => {
    return (
        <div className='d-flex flex-column room-content-container'>
            <RoomHeader room={room} className='room-content-header' />
            <div className='room-content-body'>
                <ChatWindow room={room} />
            </div>
            <div className='room-content-footer'>
                <ChatMessageForm onFormSubmit={onSendMessageButtonClick} />
            </div>
        </div>
    );
}

const Room = (props) => {
    const { error, room, onSendMessageButtonClick } = props

    if (error) {
        return renderErrorScreen(error)
    } else if (!room) {
        return renderLoadingRoom()
    } else {
        return renderRoom(room, onSendMessageButtonClick)
    }
}

export default Room;