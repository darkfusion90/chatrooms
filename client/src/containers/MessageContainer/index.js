import React from 'react';
import { connect } from 'react-redux'

import Message from '../../components/Message'

class MessageContainer extends React.Component {
    isCurrentUserMessageAuthor = () => {
        const { message, userId } = this.props
        return message && message.author && message.author._id === userId
    }

    render() {
        const { message, color } = this.props
        if (!message) {
            return null
        }

        const messageAlignment = this.isCurrentUserMessageAuthor() ? 'right' : 'left'

        return (
            <Message
                message={message}
                align={messageAlignment}
                color={color}
                isCurrentUserMessageAuthor={this.isCurrentUserMessageAuthor()}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { userId: state.user.user._id }
}

export default connect(mapStateToProps, null)(MessageContainer);
