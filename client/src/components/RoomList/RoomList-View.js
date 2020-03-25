import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'

import { EmptyRoomList, RoomListControlsHeader, RoomListItem } from './components/'

const renderRoomList = (rooms) => {
    return rooms.map((room) => <RoomListItem room={room} key={room.roomId} />)
}

const RoomList = ({ rooms, onSortFormSubmit }) => {
    if (!rooms || rooms.length === 0) {
        return <EmptyRoomList />
    }

    //TODO: Add custom sort style where users can drag a room up and down 
    //according to their convenience
    return (
        <Container fluid>
            <RoomListControlsHeader onSortFormSubmit={onSortFormSubmit} />
            <ListGroup variant='flush' className='mx-0 mt-3'>
                {renderRoomList(rooms)}
            </ListGroup>
        </Container>
    )
}

export default RoomList;
