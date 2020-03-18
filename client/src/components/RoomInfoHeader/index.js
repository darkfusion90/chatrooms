import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap/';

import { withTooltip } from '../Tooltip'
import LinkIcon from '../LinkIcon'
import showModalAction from '../../actions/showModal'
import './style.scss'

const RoomInfoHeader = ({ room, className, showModal }) => {
    if (!room) return null

    const onLeaveRoomIconClick = () => {
        showModal('LeaveRoom', { room })
    }

    const renderRoomActionIcons = () => {
        const renderIcon = ({ icon, id, onClick }) => {
            if (id === 'tooltip-close-room') {
                return <LinkIcon to='/rooms' icon={icon} replace key={id} className='cursor-pointer' />
            }
            return <FontAwesomeIcon icon={icon} key={id} className='cursor-pointer' onClick={onClick} />
        }

        return [
            { icon: faSignOutAlt, label: 'Leave Room', id: 'tooltip-leave-room', onClick: onLeaveRoomIconClick },
            { icon: faPlus, label: 'Invite User', id: 'tooltip-invite-room' },
            { icon: faWindowClose, label: 'Close Room Window', id: 'tooltip-close-room' }
        ].map(({ icon, label, id, onClick }) => {
            return withTooltip(
                renderIcon({ icon, id, onClick }),
                { label, id }
            )
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

export default connect(null, { showModal: showModalAction })(RoomInfoHeader)