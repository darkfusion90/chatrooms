import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'

import {
    EmptyRoomList,
    RoomListControlsHeader,
    RoomListItem,
    RoomListPagination
} from './components/'


const RoomList = ({
    roomsToDisplay,
    onSortFormSubmit,
    setCurrentPageNumber,
    ...otherProps
}) => {
    if (!roomsToDisplay || roomsToDisplay.length === 0) {
        return <EmptyRoomList />
    }

    
    const renderRoomList = (roomsToDisplay) => {
        return roomsToDisplay.map((room) => <RoomListItem room={room} key={room.roomId} />)
    }

    const updatePageNumber = (pageNumber) => {
        setCurrentPageNumber(pageNumber)
    }

    //TODO: Add custom sort style where users can drag a room up and down 
    //according to their convenience
    return (
        <Container fluid className='pb-5 mb-5' >
            <RoomListControlsHeader onSortFormSubmit={onSortFormSubmit} />
            <ListGroup variant='flush' className='mx-0 mt-3'>
                {renderRoomList(roomsToDisplay)}
            </ListGroup>
            <RoomListPagination {...otherProps} setCurrentPageNumber={updatePageNumber} />
        </Container>
    )
}

export default RoomList;
