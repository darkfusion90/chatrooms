import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlus} from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Row } from 'react-bootstrap/';

import './style.scss'

const RoomInfoHeader = ({ room }) => {
    if (!room) return null
    console.log('room: ', room)
    return (
        <Container fluid>
            <Row style={{ backgroundColor: '#ededed', height: '40px' }}>
                <Col>
                    <span className='room-name'><strong>{room.name}</strong></span>
                </Col>
                <Col sm={2} lg={2} md={2} xl={2}>
                    <Row>
                        <Col sm={4} lg={4} md={4} xl={4} className="col-4">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </Col>
                        <Col sm={4} lg={4} md={4} xl={4} className="col-4">
                            <FontAwesomeIcon icon={faPlus} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default RoomInfoHeader