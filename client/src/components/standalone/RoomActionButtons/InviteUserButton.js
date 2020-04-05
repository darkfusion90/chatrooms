import React from 'react';

import RoomActionButton from './RoomActionButton'

const InviteUserButton = (props) => {
    const defaultProps = {
        initial: { label: 'Send Invitation' },
        pending: { label: 'Sending Invitation...' },
        success: { label: 'Invitation Sent' },
        fail: { label: 'Error Sending Invitation' }
    }
    return <RoomActionButton  defaultProps={defaultProps} {...props} />
}

export default InviteUserButton;
