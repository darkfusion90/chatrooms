import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import ChatMessageForm from '../../components/forms/ChatMessageForm';
import MessageContainer from '../../containers/MessageContainer';

import './style.scss'

class Room extends React.Component {
    constructor() {
        super()
        this.chatListRef = React.createRef()
    }

    componentDidUpdate() {
        this.scrollChatListToBottom()
    }

    scrollChatListToBottom() {
        const chatList = this.chatListRef.current
        chatList.scrollTop = chatList.scrollHeight + 120
    }

    renderMessageList = (room) => {
        if (!room) {
            return null
        }

        return (
            <ListGroup className='chat-container pre-scrollable' ref={this.chatListRef}>
                {
                    room.messages.map(messageId => {
                        return <MessageContainer
                            roomId={room.roomId}
                            messageId={messageId}
                            key={messageId}
                        />
                    })
                }
            </ListGroup>
        )
    }

    render() {
        const { room, onSendMessageButtonClick } = this.props
        return (
            <Container style={{ border: '1px solid red', marginTop: '1vh' }}>
                <Container>
                    <p>Hey! I am the chat container of room {room ? room.name : ''}</p>
                    <br />
                    {this.renderMessageList(room)}
                </Container>
                <ChatMessageForm onFormSubmit={onSendMessageButtonClick} />
            </Container>
        );
    }
}


export default Room;
