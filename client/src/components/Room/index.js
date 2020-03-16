import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ChatMessageForm from '../../components/forms/ChatMessageForm';
import ChatWindowContainer from '../../containers/ChatWindowContainer'

import RoomInfoHeader from '../RoomInfoHeader';

const Room = (props) => {
    const { room, onSendMessageButtonClick } = props
    return (
        <div style={{ border: '1px solid red', marginTop: '1vh', height: '100%' }}>
            <RoomInfoHeader room={room} />
            <Container fluid className='d-flex flex-column justify-content-center' style={{ height: '100%' }}>
                <Row>
                    <Col>
                        <ChatWindowContainer room={room} />
                    </Col>
                </Row>

                <Row>
                    <Col style={{ backgroundColor: '#ededed' }}>
                        <ChatMessageForm onFormSubmit={onSendMessageButtonClick} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Room;
