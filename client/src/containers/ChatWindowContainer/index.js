import React from 'react';
import { ListGroup } from 'react-bootstrap';

import MessageContainer from '../../containers/MessageContainer';
import assignRandomColors from './colors'
import './style.scss';

class ChatWindowContainer extends React.Component {
    state = { randomAuthorColors: [] }

    componentDidMount() {
        const { room } = this.props
        if (room) {
            this.setState({
                randomAuthorColors: this.assignRandomColorsToMessageAuthors(room)
            })
        }
    }

    assignRandomColorsToMessageAuthors(room) {
        const messageAuthors = room.messages.map(message => message.author && message.author._id)
        return assignRandomColors(messageAuthors)
    }

    render() {
        const { room } = this.props

        if (!room) {
            return null
        }

        return (
            <ListGroup className='chat-container pre-scrollable' variant="flush">
                {
                    room.messages.map(message => {
                        const messageAuthorColor = this.state.randomAuthorColors[message.author && message.author._id]
                        return <MessageContainer
                            color={messageAuthorColor}
                            roomId={room.roomId}
                            message={message}
                            key={message && message._id}
                        />
                    })
                }
            </ListGroup>
        )
    }
}

export default ChatWindowContainer;
