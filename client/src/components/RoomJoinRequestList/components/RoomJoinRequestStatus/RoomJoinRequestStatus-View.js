import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'


const getStatusMeta = (status) => {
    switch (status) {
        case 'initial':
            return {
                icon: faClock,
                text: 'Pending'
            }
        case 'accepted':
            return {
                icon: faCheckCircle,
                color: 'green',
                text: 'Accepted'
            }
        case 'rejected':
            return {
                icon: faExclamationCircle,
                color: 'red',
                text: 'Rejected'
            }
        default:
            return {}
    }
}

const RoomJoinRequestStatus = ({ joinRequest }) => {
    const { icon, text, color } = getStatusMeta(joinRequest.status)

    return (
        <div className='d-inline-flex justify-content-center' style={{ color }}>
            <FontAwesomeIcon icon={icon} className='m-auto' />
            <p className='mx-1 my-auto'>{text}</p>
        </div>
    )
}

export default RoomJoinRequestStatus