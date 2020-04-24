import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { InviteUserModalTrigger } from '../../../standalone/RoomModalTriggers'


const ActionInviteUser = ({ room }) => {
    return (
        <InviteUserModalTrigger
            component={FontAwesomeIcon}
            icon={faPlus}
            room={room}
            className='cursor-pointer'
        />
    )
}

export default ActionInviteUser