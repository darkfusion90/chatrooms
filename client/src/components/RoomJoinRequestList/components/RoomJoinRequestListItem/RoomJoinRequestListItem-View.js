import React from 'react'
import { Container, ListGroupItem } from 'react-bootstrap'

import RoomJoinRequestMeta from '../RoomJoinRequestMeta'
import RoomJoinRequestActions from '../RoomJoinRequestActions'


const RoomJoinRequestListItemView = ({ joinRequest }) => {
    return (
        <ListGroupItem>
            <Container className='d-flex justify-content-between'>
                <div className='d-flex justify-content-center align-items-center'>
                    <RoomJoinRequestMeta joinRequest={joinRequest} />
                </div>
                <div className='m-auto d-flex justify-content-center align-items-center'>
                    <RoomJoinRequestActions joinRequest={joinRequest} className='m-auto' />
                </div>
            </Container>
        </ListGroupItem>
    )
}

export default RoomJoinRequestListItemView