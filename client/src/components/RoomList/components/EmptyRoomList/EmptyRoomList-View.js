import React from 'react'
import { ButtonGroup, Container } from 'react-bootstrap'

import {
    CreateRoomModalTrigger,
    JoinRoomModalTrigger
} from '../../../standalone/RoomModalTriggers'

import './EmptyRoomList-Style.scss'

const titleSubtitleTemplate = (title, subtitle) => {
    return (
        <Container fluid className='d-flex flex-column align-items-center'>
            <div className='title empty-room-list-title'>
                {title}
            </div>
            <div className='subtitle empty-room-list-subtitle'>
                {subtitle}
            </div>
        </Container>
    )
}

const renderEmptySearchResultView = () => {
    const title = 'No rooms matching your search query'
    const subtitle = 'Try checking spelling and other possible errors, if any'
    return titleSubtitleTemplate(title, subtitle)
}

const renderEmptyRoomListView = () => {
    const title = 'There are no public rooms available'
    const subtitle = (
        <ButtonGroup>
            <CreateRoomModalTrigger
                size='sm'
                className='empty-room-list-subtitle'
            >
                Create a room
            </CreateRoomModalTrigger>

            <JoinRoomModalTrigger
                size='sm'
                variant='outline-primary'
                className='empty-room-list-subtitle'
            >
                Join a room by Id
            </JoinRoomModalTrigger>
        </ButtonGroup>
    )
    return titleSubtitleTemplate(title, subtitle)
}

const EmptyRoomList = ({ isSearchResult }) => {
    return (
        <Container className='centered-content compensate-header'>
            {
                isSearchResult ? renderEmptySearchResultView() : renderEmptyRoomListView()
            }
        </Container>
    )
}

export default EmptyRoomList