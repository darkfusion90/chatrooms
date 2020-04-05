import React from 'react';

import RoomActionButton from './RoomActionButton'

const LeaveRoomButton = (props) => {
    const defaultProps = {
        initial: { label: 'Leave Room' },
        pending: { label: 'Leaving Room...' },
        success: { label: 'Room Left' },
        fail: { label: 'Error Leaving Room' },
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default LeaveRoomButton;
