import React from 'react';
import { Container } from 'react-bootstrap'

import SortRoomDropdownButton from './SortRoomDropdownButton'
import RoomListSearchField from '../RoomListSearchField'


const RoomListControlsHeader = ({ onSortFormSubmit, onSearchFieldInputChange }) => {
    return (
        <Container fluid className='room-page-sub-header d-flex align-items-center justify-content-between px-sm-0 mx-sm-0'>
            <Container fluid>
                <SortRoomDropdownButton onSortFormSubmit={onSortFormSubmit} />
            </Container>
            <Container fluid>
                <RoomListSearchField onSearchFieldInputChange={onSearchFieldInputChange} />
            </Container>
        </Container>
    )
}

export default RoomListControlsHeader;
