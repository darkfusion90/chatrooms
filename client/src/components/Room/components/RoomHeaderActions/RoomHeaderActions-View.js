import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSignOutAlt,
    faPlus,
    faWindowClose
} from '@fortawesome/free-solid-svg-icons'

import { WithLink, WithModalTrigger } from '../../../hoc'
import { TooltipWrapper } from '../../../standalone'


const RoomHeaderActionsView = ({ room, currentUserMemberId }) => {
    const ActionLeaveRoom = (
        <WithModalTrigger
            component={FontAwesomeIcon}
            icon={faSignOutAlt}
            className='cursor-pointer'
            modalName='LeaveRoom'
            modalProps={{ room, currentUserMemberId }}
        />
    )

    const ActionInviteUser = (
        <WithModalTrigger
            component={FontAwesomeIcon}
            icon={faPlus}
            className='cursor-pointer'
            modalName='InviteUser'
            modalProps={{ room }}
        />
    )

    const ActionCloseRoomWindow = (
        <WithLink
            component={FontAwesomeIcon}
            icon={faWindowClose}
            className='cursor-pointer'
            to='/rooms'
        />
    )

    const actionsWithTooltip = [
        {
            tooltipLabel: 'Leave Room',
            tooltipId: 'tooltip-leave-room',
            Component: ActionLeaveRoom
        },
        {
            tooltipLabel: 'Invite User',
            tooltipId: 'tooltip-invite-user',
            Component: ActionInviteUser
        },
        {
            tooltipLabel: 'Close Room Window',
            tooltipId: 'tooltip-close-room',
            Component: ActionCloseRoomWindow
        }
    ]

    return actionsWithTooltip.map(({ tooltipId, tooltipLabel, Component }) => {
        return <TooltipWrapper
            triggerComponent={Component}
            label={tooltipLabel}
            id={tooltipId}
            key={tooltipId}
        />
    })
}


export default RoomHeaderActionsView
