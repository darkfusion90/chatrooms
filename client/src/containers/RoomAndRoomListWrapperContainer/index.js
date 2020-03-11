import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import RoomListContainer from '../RoomListContainer';
import RoomContainer from '../RoomContainer';

const styles = {
    row: {
        marginLeft: 0,
        marginRight: 0,
    },
    container: {
        paddingLeft: 0
    }
}

const roomListColProps = (roomId) => {
    return roomId ? { xl: 5, lg: 5, md: 6, sm: 0, xs: 0, className: 'd-none d-md-block' } : {}
}

const roomColProps = (roomId) => {
    return roomId ? { xs: 12, sm: 12 } : {}
}

const renderRoomCol = (roomId) => {
    if (roomId) {
        return (
            <Col xl={7} lg={7} md={6} {...roomColProps(roomId)}>
                <RoomContainer roomId={roomId} key={roomId} />
            </Col>
        )
    }
}

const renderRoomListCol = (roomId) => {
    return (
        <Col {...roomListColProps(roomId)} style={{ maxHeight: '90vh', overflow: 'scroll' }}>
            <RoomListContainer />
        </Col>
    )
}

const RoomAndRoomListWrapperContainer = (props) => {
    const roomId = props.match.params.id
    return (
        <Container fluid style={styles.container}>
            <Row style={styles.row}>
                {renderRoomListCol(roomId)}
                {renderRoomCol(roomId)}
            </Row>
        </Container>
    )
}

export default RoomAndRoomListWrapperContainer;
