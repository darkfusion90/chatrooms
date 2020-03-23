import React from 'react'
import { ListGroup, Container } from 'react-bootstrap'

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
        const borderAttr = `15px solid ${color}`
        const style = align === 'left' ? { borderRight: borderAttr } : { borderLeft: borderAttr }

        return <p className={`msg-box-arrow ${align}`} style={style} />
    }

    const messageAuthor = getMessageAuthor()
    const messageArrow = renderMessageArrow()
    return (
        <ListGroup.Item key={message.id} style={{ border: "none" }}>
            <Container className={`message float-${align}`} style={{ backgroundColor: color }}>
                {align === 'left' && messageArrow}
                {
                    messageAuthor &&
                    <p>
                        <strong>{messageAuthor}</strong>
                    </p>
                }
                <p>{message.data}</p>
                {align === 'right' && messageArrow}
            </Container>

        </ListGroup.Item>
    )
}

export default Message