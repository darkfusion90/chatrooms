import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const renderRoomList = (props) => {
    const getUserById = (id) => {
        return props.users[id]
    }

    return props.rooms.map((room) => {
        const roomOwner = getUserById(room.owner)
        return (
            <ListGroup.Item key={room.roomId}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
                        </Card.Title>
                        <Card.Text>
                            {roomOwner ? `Created by: ${roomOwner.username}` : ''}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </ListGroup.Item>

        )
    })
}

const RoomList = (props) => {
    return <ListGroup variant='flush'>{renderRoomList(props)}</ListGroup>
}

export default RoomList;
