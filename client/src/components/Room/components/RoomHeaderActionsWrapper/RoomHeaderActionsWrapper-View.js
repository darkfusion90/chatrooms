import React from 'react'

import { TooltipWrapper } from '../../../standalone'
import {
    ActionInviteUser,
    ActionLeaveRoom,
    ActionRoomMenu
} from '../RoomHeaderActions'


const wrapUnderSpan = (Component, props) => {
    return <span className='cursor-pointer' {...props}>{Component}</span>
}

const ActionWithTooltip = ({ tooltipId, tooltipLabel, Component }) => {
    return (
        <TooltipWrapper
            triggerComponent={wrapUnderSpan(Component)}
            label={tooltipLabel}
            id={tooltipId}
            key={tooltipId}
        />)
}

const getAllActionsWithTooltip = ({ room, currentUserMemberId }) => {
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

    return actionsWithTooltip.map(props => {
        return <ActionWithTooltip key={props.tooltipId} {...props} />
    })
}

const RoomHeaderActionsWrapperView = (props) => {
    return [
        ...getAllActionsWithTooltip(props),
        wrapUnderSpan(<ActionRoomMenu />, { key: 'action-room-menu' })
    ]
}

export default RoomHeaderActionsWrapperView
