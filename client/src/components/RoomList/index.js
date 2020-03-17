import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import RoomListItemContainer from '../../containers/RoomListItemContainer'
import EmptyRoomList from './EmptyRoomList'
import RoomListControlsHeader from './RoomListControlsHeader'

const renderRoomList = (rooms) => {
    return rooms.map((room) => <RoomListItemContainer room={room} key={room.roomId} />)
}

const RoomList = ({ rooms, onRoomControlsChange }) => {
    if (!rooms || rooms.length === 0) {
        return <EmptyRoomList />
    }

    return (
        <>
            <RoomListControlsHeader onChange={onRoomControlsChange} />
            <ListGroup variant='flush' style={{ marginLeft: 0, marginRight: 0 }}>
                {renderRoomList(rooms)}
            </ListGroup>
        </>
    )
}

export default RoomList;
