import React from 'react';
import _ from 'lodash'

import ChatWindowView from './ChatWindow-View'
import { onNewMessage } from '../../../../api/socketIo'
import { mapKeyToColor } from './utils'

class ChatWindowContainer extends React.Component {
    state = { messageColors: {} }

    componentDidMount() {
        console.log('roomId: ', this.props.roomId)
        onNewMessage(this.props.roomId, () => this.refreshMessages())
        this.refreshMessages()
    }

    componentDidUpdate(prevProps) {
        if (_.isEqual(this.props.messages, prevProps.messages)) {
            return
        }
        this.setState({ messageColors: this.assignRandomColorsToMessageAuthors() })
    }

    refreshMessages = () => {
        console.log('will refresh!')
        this.props.fetchRoomMessages(this.props.roomId)
    }

    assignRandomColorsToMessageAuthors() {
        const { messages } = this.props
        const colors = {}

        const authors = messages.map(message => message.author && message.author._id)
        authors.forEach(author => colors[author] = mapKeyToColor(author))

        return colors
    }

    render() {
        const { messages } = this.props
        const { messageColors } = this.state
        console.log({ messageColors })
        if (!messages) {
            return null
        }

        return <ChatWindowView messages={messages} messageColors={messageColors} />
    }
}

export default ChatWindowContainer;
