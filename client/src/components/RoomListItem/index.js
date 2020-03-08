import React from 'react';
import { Card, ListGroupItem } from 'react-bootstrap';

const RoomListItem = (props) => {
    return (
        <ListGroupItem key={props.key}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {props.title}
                    </Card.Title>
                    {props.content}
                </Card.Body>
            </Card>
        </ListGroupItem>
    )
}

export default RoomListItem;
