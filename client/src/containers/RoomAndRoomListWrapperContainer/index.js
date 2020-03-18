import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import RoomListContainer from '../RoomListContainer';
import RoomContainer from '../RoomContainer';
import './style.scss'

const roomListColProps = (roomId) => {
    const fixedClass = 'overflow-auto h-100'
    if (roomId) {
        return { xl: 5, lg: 5, md: 5, sm: 0, xs: 0, className: `d-none d-md-block ${fixedClass}` }
    } else {
        return { className: fixedClass }
    }
}

const roomColProps = (roomId) => {
    const fixedProps = { xl: 7, lg: 7, md: 7 }
    const otherProps = roomId ? { xs: 12, sm: 12, className: 'h-100' } : {}

    return { ...fixedProps, ...otherProps }
}

const renderRoomCol = (roomId) => {
    if (roomId) {
        return (
            <Col {...roomColProps(roomId)} >
                <RoomContainer roomId={roomId} key={roomId} />
            </Col>
        )
    }
}

const renderRoomListCol = (roomId) => {
    return (
        <Col {...roomListColProps(roomId)}>
            <RoomListContainer />
        </Col>
    )
}

const RoomAndRoomListWrapperContainer = (props) => {
    const roomId = props.match.params.id

    return (
        <Container fluid className='pl-sm-0 pl-md-0 pr-0 room-page-container'>
            <Row className='mx-0 no-gutters h-100'>
                {renderRoomListCol(roomId)}
                {renderRoomCol(roomId)}
            </Row>
        </Container>
    )
}

export default RoomAndRoomListWrapperContainer;
