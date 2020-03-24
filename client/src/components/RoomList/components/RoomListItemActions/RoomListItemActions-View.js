import React from 'react';
import { Link } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap';

import { DeleteRoomModalTrigger } from '../../../standalone/RoomModalTriggers'
import { JoinRoomButton } from '../../../standalone/RoomActionButtons'

const getJoinRoomAction = (joinRoomProgress, onClick) => {
    return <JoinRoomButton progress={joinRoomProgress} onClick={onClick} />
}

const getDeleteRoomAction = (room) => {
    return <DeleteRoomModalTrigger room={room}>Delete</DeleteRoomModalTrigger>
}

const getOpenRoomAction = (room) => {
    const roomId = room.roomId ? room.roomId : ''
    return (
        <Link to={`/rooms/${roomId}`} className='btn btn-outline-primary'>
            Open
        </Link>
    )
}

const RoomListItemActions = (props) => {
    const { room, isCurrentUserRoomMember, isCurrentUserRoomAdmin, ...restProps } = props

    const getActionsForRoomMember = () => {
        return (
            <ButtonGroup>
                {getOpenRoomAction(room)}
                {isCurrentUserRoomAdmin ? getDeleteRoomAction(room) : null}
            </ButtonGroup>
        )
    }

    const getActionsForNonRoomMember = () => {
        const { joinRoomProgress, onJoinRoomButtonClick } = restProps
        const onClick = () => onJoinRoomButtonClick(room ? room.roomId : '')
        return getJoinRoomAction(joinRoomProgress, onClick)
    }

    return isCurrentUserRoomMember ? getActionsForRoomMember() : getActionsForNonRoomMember()
}


export default RoomListItemActions
