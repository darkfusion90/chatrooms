import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import Message from '../Message'
import './ChatWindow-Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'


const ChatWindow = (props) => {
    const { messageListLastElementRef, messages, messageColors } = props

    const renderMessages = () => {
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
                    ref={isLastMessage(currentIndex, messages) ? messageListLastElementRef : null}
                >
                    <Message
                        color={messageColors[messageAuthor]}
                        message={message}
                    />
                </ListGroup.Item>
            )
        })
    }

    const renderScrollToBottomAction = () => {
        return (
            <div id='scroll-to-bottom-icon-container'>
                <FontAwesomeIcon
                    icon={faCircle}
                    size='2x'
                    id='stb-icon-bg-helper'
                />
                <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    size='2x'
                    color='orange'
                    id='stb-icon'
                    className='cursor-pointer'
                    onClick={props.onScrollToBottomIconClick}
                />
            </div>
        )
    }

    return (
        <div className='chat-window pre-scrollable'>
            <ListGroup variant="flush">
                {renderMessages()}
            </ListGroup>
            {renderScrollToBottomAction()}
        </div>
    )
}

export default ChatWindow;