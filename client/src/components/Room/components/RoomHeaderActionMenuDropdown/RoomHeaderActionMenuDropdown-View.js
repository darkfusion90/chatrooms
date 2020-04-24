import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faUserPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { IconText } from '../../../standalone'


const FontAwesomeIconText = ({ icon, children, ...props }) => {
    return (
        <IconText icon={<FontAwesomeIcon icon={icon} />} {...props}>
            {children}
        </IconText>
    )
}

const RoomInfoAction = () => {
    return (
        <ListGroup.Item className='cursor-pointer'>
            <FontAwesomeIconText icon={faInfoCircle}>Room Info</FontAwesomeIconText>
        </ListGroup.Item>
    )
}

const JoinRequestsAction = () => {
    return (
        <ListGroup.Item className='cursor-pointer'>
            <FontAwesomeIconText icon={faUserPlus}>Join Requests</FontAwesomeIconText>
        </ListGroup.Item>
    )
}

const CloseRoomWindowAction = () => {
    return (
        <ListGroup.Item className='cursor-pointer'>
            <FontAwesomeIconText icon={faWindowClose}>
                Close Room Window
            </FontAwesomeIconText>
        </ListGroup.Item>
    )
}

const RoomHeaderActionMenuDropdownView = () => {
    return (
        <ListGroup variant='flush'>
            <RoomInfoAction />
            <JoinRequestsAction />
            <CloseRoomWindowAction />
        </ListGroup>
    )
}

export default RoomHeaderActionMenuDropdownView
