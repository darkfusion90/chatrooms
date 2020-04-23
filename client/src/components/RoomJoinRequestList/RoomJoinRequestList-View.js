import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap'
import isEmpty from 'is-empty'
import RoomJoinRequestListItemView from './components/RoomJoinRequestListItem/RoomJoinRequestListItem-View';


const RoomJoinRequestListView = ({ joinRequestList }) => {
    if (isEmpty(joinRequestList)) {
        return (
            <Container className='centered-content' fluid>
                Nothing to show
            </Container>
        )
    }

    const renderList = () => {
        return joinRequestList.map(val => {
            return <RoomJoinRequestListItemView key={val._id} joinRequest={val} />
        })
    }

    return (
        <Container className='h-100 py-3 px-lg-5 px-md-0 px-sm-0'>
            <Card>
                <Card.Header>
                    <Card.Title>Room Join Requests</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup className='mx-0' variant='flush'>
                        {renderList()}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
}


export default RoomJoinRequestListView;
