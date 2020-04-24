import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { LeaveRoomModalTrigger } from '../../../standalone/RoomModalTriggers'


const ActionLeaveRoom = ({ room, currentUserMemberId }) => {
    return (
        <LeaveRoomModalTrigger
            component={FontAwesomeIcon}
            icon={faSignOutAlt}
            room={room}
            currentUserMemberId={currentUserMemberId}
            className='cursor-pointer'
        />
    )
}

export default ActionLeaveRoom