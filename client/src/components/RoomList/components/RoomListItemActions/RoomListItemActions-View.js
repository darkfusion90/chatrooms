import React from 'react';
import { Link } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap';

import { DeleteRoomModalTrigger } from '../../../standalone/RoomModalTriggers'
import { JoinRoomButton } from '../../../standalone/RoomActionButtons'

const getJoinRoomAction = (joinRoomProgress, onClick) => {
    return <JoinRoomButton
        progress={joinRoomProgress}
        propsProgressInitial={{
            label: 'Join',
            onClick
        }}
    />
}

const getDeleteRoomAction = (room) => {
    return <DeleteRoomModalTrigger room={room}>Delete</DeleteRoomModalTrigger>
}

const getOpenRoomAction = (room) => {
    return (
        <Link to={`/rooms/${room._id}`} className='btn btn-outline-primary'>
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
