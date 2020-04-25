import React from 'react';
import _ from 'lodash'

import ChatWindowView from './ChatWindow-View'
import { onNewMessage } from '../../../../api/socketIo'
import { mapKeyToColor } from './utils'

class ChatWindowContainer extends React.Component {
    state = { messageColors: {} }

    constructor(props) {
        super(props)
        this.lastChildRef = React.createRef()
    }

    componentDidMount() {
        onNewMessage(this.props.roomId, this.refreshMessages)
        this.refreshMessages()
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottomOfMessageList()
        if (_.isEqual(this.props.messages, prevProps.messages)) {
            return
        }
        this.setState({ messageColors: this.assignRandomColorsToMessageAuthors() })
    }

    scrollToBottomOfMessageList = () => {
        const msgListCurrentRef = this.lastChildRef.current
        if (msgListCurrentRef) msgListCurrentRef.scrollIntoView()
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

        if (!messages) {
            return null
        }

        return (
            <ChatWindowView
                messages={messages}
                messageColors={messageColors}
                lastChildRef={this.lastChildRef}
                onScrollToBottomIconClick={this.scrollToBottomOfMessageList}
            />
        )
    }
}

export default ChatWindowContainer;
