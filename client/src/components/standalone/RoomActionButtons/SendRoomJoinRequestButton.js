import React from 'react';

import RoomActionButton from './RoomActionButton'

const SendRoomJoinRequestButton = (props) => {
    const defaultProps = {
        initial: { label: 'Send Join Request' },
        pending: { label: 'Sending Request...' },
        success: { label: 'Request Sent' },
        fail: { label: 'Error Sending Request' },
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default SendRoomJoinRequestButton;
