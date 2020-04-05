import React from 'react';

import RoomActionButton from './RoomActionButton'

const JoinRoomButton = (props) => {
    const defaultProps = {
        initial: { label: 'Join Room', },
        pending: { label: 'Joining Room...' },
        success: { label: 'Room Joined' },
        fail: { label: 'Error Joining Room' }
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default JoinRoomButton;
