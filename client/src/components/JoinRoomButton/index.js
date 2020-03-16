import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import showModal from '../../actions/showModal'

const JoinRoomButton = (props) => {
    const { label, showModal, ...rest } = props
    return (
        <Button onClick={() => showModal('JoinRoom')} {...rest}>
            {label || 'Join Room'}
        </Button>
    );
}

export default connect(null, { showModal })(JoinRoomButton)