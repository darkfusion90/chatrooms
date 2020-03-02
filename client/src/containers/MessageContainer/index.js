import React from 'react';
import { connect } from 'react-redux'

import Message from '../../components/Message'
import { getRoomMessage } from '../../server-communication/httpServer'

class MessageContainer extends React.Component {
    state = { message: null }

    componentDidMount() {
        const { roomId, messageId } = this.props
        getRoomMessage(roomId, messageId, this.onMessageFetchSuccess, this.onMessageFetchFailure)
    }

    onMessageFetchSuccess = (response) => {
        this.setState({ message: response.data })
    }

    onMessageFetchFailure = ({ response }) => {
        console.log('Message fetch failure: ', response)
    }

    isCurrentUserMessageAuthor = () => {
        const { message } = this.state
        console.log('message author: ', message ? message.author : '')
        console.log('userid: ', this.props.userId)
        return message && message.author === this.props.userId
    }

    render() {
        const { message } = this.state
        if (!message) {
            return null
        }

        const messageAlignment = this.isCurrentUserMessageAuthor() ? 'right' : 'left'
        const messageVariant = this.isCurrentUserMessageAuthor() ? 'primary' : 'secondary'

        console.log('Message: ', message, '\nIs owner: ', this.isCurrentUserMessageAuthor())

        return (
            <Message
                message={message}
                align={messageAlignment}
                variant={messageVariant}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { userId: state.user.user.userId }
}

export default connect(mapStateToProps, null)(MessageContainer);
