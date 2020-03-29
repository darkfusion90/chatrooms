import React from 'react'
import isEmpty from 'is-empty'
import { Container, ListGroup } from 'react-bootstrap'

import {
    EmptyRoomList,
    RoomListControlsHeader,
    RoomListItem,
    RoomListPagination
} from './components/'


const RoomList = ({
    roomsToDisplay,
    isSearchResult,
    onDisplayControlsFormSubmit,
    onSearchFieldInputChange,
    setCurrentPageNumber,
    ...otherProps
}) => {

    const renderRoomList = () => {
        if (isEmpty(roomsToDisplay)) {
            return <EmptyRoomList isSearchResult={isSearchResult} />
        }

        return (
            <ListGroup variant='flush' className='mx-0 mt-3'>
                {
                    roomsToDisplay.map((room) => {
                        return <RoomListItem room={room} key={room.roomId} />
                    })
                }
            </ListGroup>
        )
    }

    const updatePageNumber = (pageNumber) => {
        setCurrentPageNumber(pageNumber)
    }

    //TODO: Add custom sort style where users can drag a room up and down 
    //according to their convenience
    return (
        <Container fluid className='pb-5 mb-5' >
            <RoomListControlsHeader
                onDisplayControlsFormSubmit={onDisplayControlsFormSubmit}
                onSearchFieldInputChange={onSearchFieldInputChange}
            />
            {renderRoomList()}
            {
                !isEmpty(roomsToDisplay)
                    ? <RoomListPagination {...otherProps} setCurrentPageNumber={updatePageNumber} />
                    : null
            }
        </Container>
    )
}

export default RoomList;
