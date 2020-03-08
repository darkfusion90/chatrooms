import React from 'react'
import RoomListItemContainer from '../../containers/RoomListItemContainer'
import ListGroup from 'react-bootstrap/ListGroup'

const renderRoomList = (props) => {
    return props.rooms.map((room) => <RoomListItemContainer room={room} key={room.roomId}/>)
}

const RoomList = (props) => {
    return <ListGroup variant='flush'>{renderRoomList(props)}</ListGroup>
}

export default RoomList;
