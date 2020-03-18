import React from 'react';

import ChatMessageForm from '../../components/forms/ChatMessageForm';
import ChatWindowContainer from '../../containers/ChatWindowContainer'

import RoomInfoHeader from '../RoomInfoHeader';
import './style.scss'

const Room = (props) => {
    const { room, onSendMessageButtonClick } = props
    return (
        <div className='d-flex flex-column room-content-container'>
            <RoomInfoHeader room={room} className='room-content-header' />
            <div className='room-content-body'>
                <ChatWindowContainer room={room} />
            </div>
            <div className='room-content-footer'>
                <ChatMessageForm onFormSubmit={onSendMessageButtonClick} />
            </div>
        </div>
    );
}

export default Room;