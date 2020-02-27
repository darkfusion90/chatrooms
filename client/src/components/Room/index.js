import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import ChatMessageForm from '../../components/forms/ChatMessageForm';
import MessageContainer from '../../containers/MessageContainer';

import './style.scss'

const renderMessageList = (room) => {
    if (!room) {
        return null
    }

    return (
        <ListGroup className='chat-container pre-scrollable'>
            {
                room.messages.map(messageId => {
                    return <MessageContainer messageId={messageId} key={messageId} />
                })
            }
        </ListGroup>
    )
}

const Room = ({ room, onSendMessageButtonClick }) => {
    console.log('room: ', room)
    return (
        <Container style={{ border: '1px solid red' }}>
            <Container>
                <p>Hey! I am the chat container of room {room ? room.name : ''}</p>
                <br />
                {renderMessageList(room)}
            </Container>
            <ChatMessageForm onFormSubmit={onSendMessageButtonClick} />
        </Container>
    );
}


export default Room;
