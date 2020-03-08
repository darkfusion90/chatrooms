import React from 'react';
import { Card, ListGroupItem } from 'react-bootstrap';

const RoomListItem = ({ title, content, footer, key }) => {
    return (
        <ListGroupItem key={key}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    {content}
                </Card.Body>
                {
                    footer ? <Card.Footer>{footer}</Card.Footer> : ''
                }
            </Card>
        </ListGroupItem>
    )
}

export default RoomListItem;
