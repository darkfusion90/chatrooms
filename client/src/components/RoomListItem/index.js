import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroupItem } from 'react-bootstrap';
import convertISODateToReadableString from '../../helpers/convertISODateToReadableString'

const renderRoomMeta = (room) => {
    const roomOwner = room.createdBy
    const roomCreatedBy = roomOwner ? roomOwner.username : '<unknown>'
    const roomCreatedAt = convertISODateToReadableString(room.createdAt)

    return `Created ${roomCreatedAt} by ${roomCreatedBy}`
}

const RoomListItem = ({ room }) => {
    return (
        <ListGroupItem key={room.roomId}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
                    </Card.Title>
                    <Card.Text>
                        {renderRoomMeta(room)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </ListGroupItem>
    )
}

export default RoomListItem;
