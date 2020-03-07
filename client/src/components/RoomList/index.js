import React from 'react'
import RoomListItem from '../RoomListItem'
import ListGroup from 'react-bootstrap/ListGroup'

const renderRoomList = (props) => {
    return props.rooms.map((room) => <RoomListItem room={room} />)
}

const RoomList = (props) => {
    return <ListGroup variant='flush'>{renderRoomList(props)}</ListGroup>
}

export default RoomList;
