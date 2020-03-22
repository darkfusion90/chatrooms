import React from 'react';

import ChatWindowView from './ChatWindow-View'
import { assignColorsRandomly } from './utils'

class ChatWindowContainer extends React.Component {
    state = { randomAuthorColors: [] }

    componentDidMount() {
        const { room } = this.props
        if (room) {
            this.setState({
                randomAuthorColors: this.assignRandomColorsToMessageAuthors()
            })
        }
    }

    assignRandomColorsToMessageAuthors() {
        const { room } = this.props
        const messageAuthors = room.messages.map(message => message.author && message.author._id)
        return assignColorsRandomly(messageAuthors)
    }

    render() {
        const { room } = this.props
        const { randomAuthorColors } = this.state
        if (!room) {
            return null
        }

        return <ChatWindowView room={room} colorsAssignedToMessageAuthors={randomAuthorColors} />
    }
}

export default ChatWindowContainer;
