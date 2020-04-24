import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap'

import { RoomJoinRequestListItem, RoomJoinRequestListHeader } from './components'


const RoomJoinRequestListView = ({ joinRequestList }) => {
    const renderList = () => {
        return joinRequestList.map(val => {
            return <RoomJoinRequestListItem key={val._id} joinRequest={val} />
        })
    }

    return (
        <Container className='h-100 py-3 px-lg-5 px-md-0 px-sm-0'>
            <Card>
                <Card.Header>
                    <Card.Title>
                        <RoomJoinRequestListHeader joinRequestList={joinRequestList} />
                    </Card.Title>
                </Card.Header>
                <Card.Body className='pre-scrollable'>
                    <ListGroup className='mx-0' variant='flush'>
                        {renderList()}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
}


export default RoomJoinRequestListView;
