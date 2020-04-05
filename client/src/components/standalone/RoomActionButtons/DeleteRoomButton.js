import React from 'react';

import RoomActionButton from './RoomActionButton'

const DeleteRoomButton = (props) => {
    const defaultProps = {
        initial: { label: 'Delete Room' },
        pending: { label: 'Deleting Room...' },
        success: { label: 'Room Deleted' },
        fail: { label: 'Error Deleting Room' }
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default DeleteRoomButton;
