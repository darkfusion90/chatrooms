import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import Message from '../Message'
import './ChatWindow-Style.scss'

const ChatWindow = (props) => {
    const { messages, messageColors } = props

    const renderMessages = () => {
        let prevMessageAuthor;
        return messages.map(message => {
            const messageAuthor = message.author && message.author._id
            const paddingTop = messageAuthor === prevMessageAuthor ? 'pt-0' : ''
            prevMessageAuthor = messageAuthor

            return (
                <ListGroup.Item
                    key={message && message._id}
                    className={`border-0 ${paddingTop} pb-1`}
                >
                    <Message
                        color={messageColors[messageAuthor]}
                        message={message}
                    />
                </ListGroup.Item>
            )
        })
    }

    return (
        <ListGroup className='chat-window pre-scrollable' variant="flush">
            {renderMessages()}
        </ListGroup>
    )
}

export default ChatWindow;