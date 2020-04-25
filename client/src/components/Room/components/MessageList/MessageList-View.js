import React from 'react'
import { ListGroup } from 'react-bootstrap/'

import Message from '../Message'


const renderMessages = (messages, messageColors, lastChildRef) => {
    const isLastMessage = (currentIndex, messages) => {
        return currentIndex === messages.length - 1
    }

    let prevMessageAuthor, currentIndex = 0;
    return messages.map(message => {
        currentIndex++
        const messageAuthor = message.author && message.author._id
        const paddingTop = messageAuthor === prevMessageAuthor ? 'pt-0' : ''
        prevMessageAuthor = messageAuthor

        return (
            <ListGroup.Item
                key={message && message._id}
                className={`border-0 ${paddingTop} pb-1`}
                ref={isLastMessage(currentIndex, messages) ? lastChildRef : null}
            >
                <Message
                    color={messageColors[messageAuthor]}
                    message={message}
                />
            </ListGroup.Item>
        )
    })
}

const MessageListView = React.forwardRef((props, ref) => {
    const { lastChildRef, messages, messageColors } = props

    return (
        <ListGroup variant="flush" ref={ref}>
            {renderMessages(messages, messageColors, lastChildRef)}
        </ListGroup>
    )
})


export default MessageListView
