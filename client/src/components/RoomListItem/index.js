import React from 'react';
import { Card, ListGroupItem } from 'react-bootstrap';

const RoomListItem = ({ title, content, footer, key }) => {
    const style = { backgroundColor: '#ededed' }

    return (
        <ListGroupItem key={key} className='px-0'>
            <Card className='border-0 mx-0 px-0' style={style}>
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
