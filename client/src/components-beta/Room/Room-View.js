import React from 'react';

import { ChatMessageForm, ChatWindow, RoomHeader } from './components'
import './Room-Style.scss'


const Room = (props) => {
    const { room, onSendMessageButtonClick } = props
    const cw = <ChatWindow room={room} />
    const cmw = <ChatMessageForm onFormSubmit={onSendMessageButtonClick} />
    return (
        <div className='d-flex flex-column room-content-container'>
            <RoomHeader room={room} className='room-content-header' />
            <div className='room-content-body'>
                {cw}
            </div>
            <div className='room-content-footer'>
                {cmw}
            </div>
        </div>
    );
}

export default Room;