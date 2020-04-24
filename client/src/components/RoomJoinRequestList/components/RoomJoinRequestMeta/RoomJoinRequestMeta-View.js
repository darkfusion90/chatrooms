import React from 'react'
import { Link } from 'react-router-dom'

import RoomJoinRequestStatus from '../RoomJoinRequestStatus'
import convertISODateToReadableString from '../../../../helpers/convertISODateToReadableString'
import { DotSeparatedTexts } from '../../../standalone'


const RoomJoinRequestMeta = ({ joinRequest }) => {
    const requestDateTime = convertISODateToReadableString(joinRequest.requestedAt)
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
            <DotSeparatedTexts className='subtitle'>
                <RoomJoinRequestStatus joinRequest={joinRequest} />
                <span className='mx-1'>Requested {requestDateTime}</span>
            </DotSeparatedTexts>
        </div>
    )
}

export default RoomJoinRequestMeta