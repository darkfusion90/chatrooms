import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


import RoomJoinRequestStatus from '../RoomJoinRequestStatus'


const RoomJoinRequestMeta = ({ joinRequest }) => {
    const { room } = joinRequest
    return (
        <div>
            <Link
                to={`/rooms/${room._id}`}
                target='_blank'
                className='d-block title mb-1'
            >
                {room.name}
            </Link>
            <div className='d-flex subtitle'>
                <RoomJoinRequestStatus joinRequest={joinRequest} />
                <FontAwesomeIcon icon={faCircle} size='xs' className='mx-1 my-auto' />
                <span className='mx-1'>Requested yesterday</span>
            </div>
        </div>
    )
}

export default RoomJoinRequestMeta