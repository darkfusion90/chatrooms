import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import MessageOptions from '../MessageOptions'
import { Dropdown } from '../../../standalone'
import { getFormattedTime } from './utils'

import './Message-Style.scss'

const Message = (props) => {
    const { message, align, color, isCurrentUserMessageAuthor } = props
    if (!message) {
        return null
    }

    const getMessageTime = () => {
        return getFormattedTime(new Date(message.createdAt))
    }

    const getMessageAuthor = () => {
        const { author } = message
        return isCurrentUserMessageAuthor ? 'You' : (author && author.username) || '<unknown-user>'
    }

    const renderMessageArrow = () => {
        const borderAttr = `15px solid green`
        const style = align === 'left' ? { borderRight: borderAttr } : { borderLeft: borderAttr }

        return <p className={`msg-box-arrow ${align}`} style={style} />
    }

    const renderMessageOptionsIcon = () => {
        const optionsIcon = <FontAwesomeIcon
            icon={faAngleDown}
            size='xs'
            className={`msg-menu-icon msg-${align}`}
        />

        return <Dropdown
            triggerComponent={optionsIcon}
            menu={<MessageOptions message={message} />}
            menuParentProps={{ className: 'p-0 border-radius-none' }}
        />
    }

    const messageArrow = renderMessageArrow()
    return (
        <Container className={`message msg-${align} float-${align}`}>
            {renderMessageOptionsIcon()}
            {align === 'left' && messageArrow}
            <div className='mb-0 d-flex justify-content-between align-items-baseline'>
                <p className='d-inline m-0' style={{ color }}>{getMessageAuthor()}</p>
                <p className='message-timestamp d-inline'>
                {getMessageTime()}
                </p>
            </div>
            <p className='mb-0'>{message.data}</p>
            {align === 'right' && messageArrow}
        </Container>
    )
}

export default Message