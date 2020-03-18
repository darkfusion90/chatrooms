import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import RoomListItemContainer from '../../containers/RoomListItemContainer'
import EmptyRoomList from './EmptyRoomList'


const renderRoomList = (rooms) => {
    return rooms.map((room) => <RoomListItemContainer room={room} key={room.roomId} />)
}

const RoomList = ({ rooms, onRoomControlsChange }) => {
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
