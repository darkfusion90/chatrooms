import React from 'react';
import { connect } from 'react-redux'

import Message from '../../components/Message'
const logger = require('../../helpers/logger')('[MessageContainer]')

class MessageContainer extends React.Component {
    isCurrentUserMessageAuthor = () => {
        const { message } = this.props
        return message && message.author === this.props.userId
    }

    render() {
        const { message } = this.props
        if (!message) {
            return null
        }

        const messageAlignment = this.isCurrentUserMessageAuthor() ? 'right' : 'left'
        const messageVariant = this.isCurrentUserMessageAuthor() ? 'primary' : 'secondary'

        logger.debug('Message: ', message, '\nIs owner: ', this.isCurrentUserMessageAuthor())

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
    return { userId: state.user.user._id }
}

export default connect(mapStateToProps, null)(MessageContainer);
