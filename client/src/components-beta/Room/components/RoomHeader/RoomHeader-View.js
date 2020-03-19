import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap/';

import { WithLink, WithModalTrigger } from '../../../hoc'
import { TooltipWrapper } from '../../../standalone'
import './RoomHeader-Style.scss'

const RoomHeader = ({ room, className }) => {
    const renderRoomActionIcons = () => {
        const ActionLeaveRoom = (
            <WithModalTrigger
                component={FontAwesomeIcon}
                componentProps={{ icon: faSignOutAlt, className: 'cursor-pointer' }}
                modalName='LeaveRoom'
                modalProps={{ room }}
            />
        )

        const ActionInviteUser = (
            <FontAwesomeIcon
                icon={faPlus}
                className='cursor-pointer'
            />
        )

        const ActionCloseRoomWindow = (
            <WithLink
                component={FontAwesomeIcon}
                componentProps={{ icon: faWindowClose, className: 'cursor-pointer' }}
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

    return (
        <Container fluid className={`room-page-sub-header ${className}`}>
            <div className='d-flex align-items-center h-100'>
                <div className='room-name-container'>
                    <strong>{room.name}</strong>
                </div>
                <div className='room-actions-container'>
                    <div className='d-flex justify-content-around'>
                        {renderRoomActionIcons()}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default RoomHeader