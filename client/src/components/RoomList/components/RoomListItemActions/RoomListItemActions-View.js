import React from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';
import { WithModalTrigger, WithLink } from '../../../hoc'

const RoomListItemActions = (props) => {
    const { room, isCurrentUserRoomMember, isCurrentUserRoomAdmin } = props

    const getActionsForRoomMember = () => {
        const ActionDeleteRoom = (
            <WithModalTrigger
                modalName='DeleteRoom'
                modalProps={{ room }}
                component={Button}
                componentProps={{ variant: 'danger' }}
                content='Delete Room'
            />
        )

        const ActionOpenRoom = (
            <WithLink
                to={`/test/rooms/${room.roomId}`}
                component={Button}
            >Open Room</WithLink>
        )

        return (
            <ButtonGroup>
                {ActionOpenRoom}
                {isCurrentUserRoomAdmin ? ActionDeleteRoom : null}
            </ButtonGroup>
        )
    }

    const getActionsForNonRoomMember = () => {
        return <div className='btn btn-outline-primary'>Join Room</div>
    }

    return isCurrentUserRoomMember ? getActionsForRoomMember() : getActionsForNonRoomMember()
}


export default RoomListItemActions
