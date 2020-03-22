import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import { EmptyRoomList, RoomListItem } from './components/'

const renderRoomList = (rooms) => {
    return rooms.map((room) => <RoomListItem room={room} key={room.roomId} />)
}

const RoomList = ({ rooms }) => {
    if (!rooms || rooms.length === 0) {
        return <EmptyRoomList />
    }

    return (
        <ListGroup variant='flush' className='mx-0'>
            {renderRoomList(rooms)}
        </ListGroup>
    )
}

export default RoomList;
