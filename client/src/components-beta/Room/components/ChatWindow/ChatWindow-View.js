import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import Message from '../Message'
import './ChatWindow-Style.scss'

const ChatWindow = (props) => {
    const { room, colorsAssignedToMessageAuthors } = props

    const renderMessages = () => {
        return room.messages.map(message => {
            const messageAuthor = message.author && message.author._id
            return <Message
                color={colorsAssignedToMessageAuthors[messageAuthor]}
                roomId={room.roomId}
                message={message}
                key={message && message._id}
            />
        })
    }

    return (
        <ListGroup className='chat-container pre-scrollable' variant="flush">
            {renderMessages()}
        </ListGroup>
    )
}

export default ChatWindow;