import React from 'react'
import { ListGroup, Container } from 'react-bootstrap'

const Message = (props) => {
    const { message, align, variant } = props
    if (!message) {
        return null
    }

    return (
        <ListGroup.Item className={`text-${align}`} key={message.id} variant={variant}>
            <Container>
                {message.data}
            </Container>
        </ListGroup.Item>
    )
}

export default Message