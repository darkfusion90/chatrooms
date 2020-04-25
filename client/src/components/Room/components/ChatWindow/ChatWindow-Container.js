import React from 'react';
import _ from 'lodash'

import ChatWindowView from './ChatWindow-View'
import { onNewMessage } from '../../../../api/socketIo'
import { mapKeyToColor } from './utils'


class ChatWindowContainer extends React.Component {
    state = {
        messageColors: {},
        shouldShowScrollToBottom: false
    }

    constructor(props) {
        super(props)
        this.lastChildRef = React.createRef()
        this.selfViewRef = React.createRef()
    }

    componentDidMount() {
        onNewMessage(this.props.roomId, this.refreshMessages)
        this.refreshMessages()
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.messages, prevProps.messages)) {
            this.scrollToBottomOfMessageList()
            this.setState({ messageColors: this.assignRandomColorsToMessageAuthors() })
        }
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

    shouldShowScrollToBottom = () => {

    }

    shouldShowScrollToBottom=()=>{
        const hasScrolledToBottom = () =>{
            if (!this.selfViewRef.current) {
                return false
            }
            
            const selfView = this.selfViewRef.current
            return selfView.scrollTop === selfView.scrollTopMax
        }

        return !hasScrolledToBottom()
    }

    handleScroll = () => {
        this.setState({ 
            shouldShowScrollToBottom: this.shouldShowScrollToBottom()
        })
    }

    render() {
        const { messages } = this.props
        const { messageColors, shouldShowScrollToBottom } = this.state

        if (!messages) {
            return null
        }

        return (
            <ChatWindowView
                ref={this.selfViewRef}
                onScroll={this.handleScroll}
                messages={messages}
                messageColors={messageColors}
                shouldShowScrollToBottom={shouldShowScrollToBottom}
                lastChildRef={this.lastChildRef}
                onScrollToBottomIconClick={this.scrollToBottomOfMessageList}
            />
        )
    }
}


export default ChatWindowContainer;
