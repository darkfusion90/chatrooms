import React from 'react';
import { Container } from 'react-bootstrap'

import RoomListDisplayFilter from '../RoomListDisplayFilter'
import RoomListSearchField from '../RoomListSearchField'


const RoomListControlsHeader = ({
    paginationItemsPerPage,
    onDisplayControlsFormSubmit,
    onSearchFieldInputChange
}) => {
    return (
        <Container fluid className='room-page-sub-header d-flex align-items-center justify-content-between px-sm-0 mx-sm-0'>
            <Container fluid>
                <RoomListDisplayFilter
                    paginationItemsPerPage={paginationItemsPerPage}
                    onDisplayControlsFormSubmit={onDisplayControlsFormSubmit}
                />
            </Container>
            <Container fluid>
                <RoomListSearchField onSearchFieldInputChange={onSearchFieldInputChange} />
            </Container>
        </Container>
    )
}

export default RoomListControlsHeader;
