import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import withLayout from '../../components/hoc/WithLayout'
import Room from '../../components/Room'
import RoomList from '../../components/RoomList'
import './Route-Room-Style.scss'

const getRoomListColProps = (roomId) => {
    const fixedClass = 'overflow-auto h-100'
    if (roomId) {
        return { xl: 5, lg: 5, md: 5, sm: 0, xs: 0, className: `d-none d-md-block ${fixedClass}` }
    } else {
        return { className: fixedClass }
    }
}

const getRoomColProps = (roomId) => {
    const fixedProps = { xl: 7, lg: 7, md: 7 }
    const otherProps = roomId ? { xs: 12, sm: 12, className: 'h-100' } : {}

    return { ...fixedProps, ...otherProps }
}

const renderRoomCol = (roomId) => {
    if (roomId) {
        return (
            <Col {...getRoomColProps(roomId)} >
                <Room roomId={roomId} key={roomId} />
            </Col>
        )
    }
}

const renderRoomListCol = (roomId) => {
    return (
        <Col {...getRoomListColProps(roomId)}>
            <RoomList />
        </Col>
    )
}

const RouteRooms = (props) => {
    const roomId = props.match.params.id

    const content = (
        <Container fluid className='pl-0 pr-0 room-page-container'>
            <Row className='mx-0 no-gutters h-100'>
                {renderRoomListCol(roomId)}
                {renderRoomCol(roomId)}
            </Row>
        </Container>
    )

    return withLayout(content)
}

export default RouteRooms;
