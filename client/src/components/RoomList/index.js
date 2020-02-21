import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const renderRoomList = (rooms) => {
    return rooms.map(({ roomId, name, owner }) => {
        return (
            <ListGroup.Item key={roomId}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <Link to={`/rooms/${roomId}`}>{name}</Link>
                        </Card.Title>
                        <Card.Text>
                            Created by: {owner}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </ListGroup.Item>

        )
    })
}

const RoomList = (props) => {
    return <ListGroup variant='flush'>{renderRoomList(props.rooms)}</ListGroup>
}

export default RoomList;
