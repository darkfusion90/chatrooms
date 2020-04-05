import React from 'react';

import RoomActionButton from './RoomActionButton'

const AcceptRoomInvitationButton = (props) => {
    const defaultProps = {
        initial: { label: 'Accept' },
        pending: { label: 'Accepting Invitation...' },
        success: { label: 'Accepted' },
        fail: { label: 'Error Accepting Invitation' },
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default AcceptRoomInvitationButton;  