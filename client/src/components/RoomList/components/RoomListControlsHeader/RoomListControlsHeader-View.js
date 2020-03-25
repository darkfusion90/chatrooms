import React from 'react';
import { Container } from 'react-bootstrap'

import SortRoomDropdownButton from './SortRoomDropdownButton'

const RoomListControlsHeader = ({ onSortFormSubmit }) => {
    return (
        <Container fluid className='room-page-sub-header d-flex align-items-center'>
            <SortRoomDropdownButton onSortFormSubmit={onSortFormSubmit} />
        </Container>
    )
}

export default RoomListControlsHeader;
