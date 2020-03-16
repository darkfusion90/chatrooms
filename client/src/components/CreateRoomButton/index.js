import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import showModal from '../../actions/showModal'

const CreateRoomButton = (props) => {
    const { label, showModal, ...rest } = props
    return (
        <Button onClick={() => showModal('CreateRoom')} {...rest}>
            {label || 'Create Room'}
        </Button>
    );
}

export default connect(null, { showModal })(CreateRoomButton)