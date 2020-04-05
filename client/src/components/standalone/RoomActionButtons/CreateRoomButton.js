import React from 'react';

import RoomActionButton from './RoomActionButton'

const CreateRoomButton = (props) => {
    const defaultProps = {
        initial: { label: 'Create Room' },
        pending: { label: 'Creating Room...' },
        success: { label: 'Room Created' },
        fail: { label: 'Error Creating Room' },
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default CreateRoomButton;
