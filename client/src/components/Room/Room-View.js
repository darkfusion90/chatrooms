import React from 'react';
import { Spinner } from 'react-bootstrap'

import { ChatMessageForm, ChatWindow, RoomHeader, RoomNotJoined } from './components'
import './Room-Style.scss'

const renderLoadingRoom = () => {
    return (
        <div className='centered-content'>
            <h2>Please wait while the Room is loading...</h2>
            <Spinner size='lg' animation='border' />
        </div>
    );
}

const renderErrorScreen = (error, roomId) => {
    const renderForbiddenError = () => {
        if (error.data.reason === 'NOT_A_ROOM_MEMBER') {
            return <RoomNotJoined roomId={roomId} isPrivateRoom />
        } else {
            return <div>You are not allowed to access this room</div>
        }
    }
    //TODO:
    //Make components like <RoomNotFound room-{room} />
    //Use <PageNotFound />, etc inside those components providing appropriate messages
    switch (error.status) {
        case 403:
            return renderForbiddenError()
        default:
            return <div>Unexpected Error</div>
    }
}

const renderRoomContent = (room, onSendMessageButtonClick, onTextInputKeyDown) => {
    return (
        <>
            <RoomHeader room={room} className='room-content-header' />
            <div className='room-content-body'>
                <ChatWindow roomId={room._id} />
            </div>
            <div className='room-content-footer'>
                <ChatMessageForm
                    onFormSubmit={onSendMessageButtonClick}
                    onTextInputKeyDown={onTextInputKeyDown}
                />
            </div>
        </>
    )
}

const renderRoom = (room, onSendMessageButtonClick, onTextInputKeyDown) => {
    return (
        <div className='d-flex flex-column room-content-container'>
            {renderRoomContent(room, onSendMessageButtonClick, onTextInputKeyDown)}
        </div>
    );
}

const Room = ({
    error,
    room,
    roomId,
    isCurrentUserRoomMembershipUndetermined,
    isCurrentUserRoomMember,
    onSendMessageButtonClick,
    onTextInputKeyDown
}) => {
    if (error) {
        return renderErrorScreen(error, roomId)
    } else if (!room || isCurrentUserRoomMembershipUndetermined) {
        return renderLoadingRoom()
    } else if (!isCurrentUserRoomMember) {
        return <RoomNotJoined roomId={room._id} />
    } else {
        return renderRoom(room, onSendMessageButtonClick, onTextInputKeyDown)
    }
}

export default Room;