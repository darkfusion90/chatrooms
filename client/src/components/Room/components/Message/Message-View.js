import React from 'react'
import { Container } from 'react-bootstrap'

import './Message-Style.scss'

const Message = (props) => {
    const { message, align, color, isCurrentUserMessageAuthor } = props
    if (!message) {
        return null
    }

    const getMessageAuthor = () => {
        return isCurrentUserMessageAuthor ? 'You' : message.author && message.author.username ? message.author.username : '<unknown-user>'
    }

    const renderMessageArrow = () => {
        const borderAttr = `15px solid #0c5460`
        const style = align === 'left' ? { borderRight: borderAttr } : { borderLeft: borderAttr }

        return <p className={`msg-box-arrow ${align}`} style={style} />
    }

    const messageAuthor = getMessageAuthor()
    const messageArrow = renderMessageArrow()
    return (
        <Container className={`message float-${align}`}>
            {align === 'left' && messageArrow}
            {
                <p style={{ color }}>
                    <strong>{messageAuthor}</strong>
                </p>
            }
            <p>{message.data}</p>
            {align === 'right' && messageArrow}
        </Container>
    )
}

export default Message