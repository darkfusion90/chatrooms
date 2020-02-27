import React from 'react';
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap';

import Message from '../../components/Message'
import { getMessage } from '../../server-communication/httpServer'

class MessageContainer extends React.Component {
    state = { message: null }

    componentDidMount() {
        getMessage(this.props.messageId, this.onMessageFetchSuccess, this.onMessageFetchFailure)
    }

    onMessageFetchSuccess = (response) => {
        console.log('Message fetch success: ', response)
        this.setState({ message: response.data })
    }

    onMessageFetchFailure = ({ response }) => {
        console.log('Message fetch failure: ', response)
    }

    isCurrentUserMessageAuthor = () => {
        const { message } = this.state
        return message && message.author === this.props.userId
    }

    render() {
        const { message } = this.state
        if (!message) {
            return null
        }

        const messageAlignment = this.isCurrentUserMessageAuthor() ? 'right' : 'left'
        const messageVariant = this.isCurrentUserMessageAuthor() ? 'primary' : 'secondary'

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
