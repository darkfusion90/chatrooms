import React from 'react'

import MessageList from '../MessageList'
import './ChatWindow-Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'


const ChatWindow = (props) => {
    const { lastChildRef, messages, messageColors } = props

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
            <MessageList
                messages={messages}
                messageColors={messageColors}
                lastChildRef={lastChildRef}
            />
            {renderScrollToBottomAction()}
        </div>
    )
}


export default ChatWindow;