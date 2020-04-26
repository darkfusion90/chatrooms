import React from 'react'
import { ListGroup } from 'react-bootstrap'

import { FocusableListItem } from '../../../../standalone'
import {
    ActionCloseRoomWindow,
    ActionRoomInfo,
    ActionShowJoinRequests
} from '../'


const RoomHeaderActionMenuDropdownView = () => {
    return (
        <ListGroup variant='flush' role='navigation'>
            <ActionRoomInfo component={FocusableListItem} />
            <ActionShowJoinRequests component={FocusableListItem} />
            <ActionCloseRoomWindow component={FocusableListItem} />
        </ListGroup>
    )
}

export default RoomHeaderActionMenuDropdownView
