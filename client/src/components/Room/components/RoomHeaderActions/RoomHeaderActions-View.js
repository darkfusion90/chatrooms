import React from 'react'

import ActionLeaveRoom from './ActionLeaveRoom'
import ActionInviteUser from './ActionInviteUser'
import ActionRoomMenu from './ActionRoomMenu'
import { TooltipWrapper } from '../../../standalone'


const TooltipAction = ({ tooltipId, tooltipLabel, Component }) => {
    return (
        <TooltipWrapper
            triggerComponent={<span className='cursor-pointer'>{Component}</span>}
            label={tooltipLabel}
            id={tooltipId}
            key={tooltipId}
        />)
}

const RoomHeaderActionsView = ({ room, currentUserMemberId }) => {
    const actionsWithTooltip = [
        {
            tooltipLabel: 'Leave Room',
            tooltipId: 'tooltip-leave-room',
            Component: <ActionLeaveRoom room={room} currentUserMemberId={currentUserMemberId} />
        },
        {
            tooltipLabel: 'Invite User',
            tooltipId: 'tooltip-invite-user',
            Component: <ActionInviteUser room={room} />
        }
    ]
    const tooltipActions = actionsWithTooltip.map(props => <TooltipAction {...props} />)

    return [
        ...tooltipActions,
        <span className='cursor-pointer'>
            <ActionRoomMenu />
        </span>
    ]
}


export default RoomHeaderActionsView
