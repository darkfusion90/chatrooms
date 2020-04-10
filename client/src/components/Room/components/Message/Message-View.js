import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import MessageOptions from '../MessageOptions'
import { Dropdown } from '../../../standalone'

import './Message-Style.scss'

const Message = (props) => {
    const { message, align, color, isCurrentUserMessageAuthor } = props
    if (!message) {
        return null
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

    const messageAuthor = getMessageAuthor()
    const messageArrow = renderMessageArrow()
    return (
        <Container className={`message msg-${align} float-${align}`}>
            {renderMessageOptionsIcon()}
            {align === 'left' && messageArrow}
            <p style={{ color }} className='mb-0'>
                {messageAuthor}
            </p>
            <p className='mb-0'>{message.data}</p>
            {align === 'right' && messageArrow}
        </Container>
    )
}

export default Message