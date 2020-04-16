import React from 'react'
import isEmpty from 'is-empty'
import { Container, ListGroup } from 'react-bootstrap'

import {
    EmptyRoomList,
    RoomListControlsHeader,
    RoomListItem,
    RoomListPagination
} from './components/'


const RoomListView = ({ rooms, isSearchResult }) => {

    const renderRoomList = () => {
        if (isEmpty(rooms)) {
            return <EmptyRoomList isSearchResult={isSearchResult} />
        }

        return (
            <ListGroup variant='flush' className='mx-0 mt-3'>
                {rooms.map((room) => <RoomListItem room={room} key={room._id} />)}
            </ListGroup>
        )
    }

    const renderRoomListPagination = () => {
        return isEmpty(rooms) ? null : <RoomListPagination />
    }

    //TODO: Add custom sort style where users can drag a room up and down 
    //according to their convenience
    return (
        <Container fluid className='pb-5 mb-5' >
            <RoomListControlsHeader />
            {renderRoomList()}
            {renderRoomListPagination()}
        </Container>
    )
}

export default RoomListView;
