import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

import convertISODateToReadableString from '../../../../helpers/convertISODateToReadableString'
import RoomListItem from './RoomListItem-View'
import RoomListItemActions from '../RoomListItemActions'

class RoomListItemContainer extends React.Component {
    state = { error: null }

    renderRoomMetaData() {
        const { room } = this.props
        const roomOwner = room.createdBy
        const roomCreatedBy = roomOwner ? roomOwner.username : '<unknown>'
        const roomCreatedAt = convertISODateToReadableString(room.createdAt)

        return `Created ${roomCreatedAt} by ${roomCreatedBy}`
    }

    renderComponentContent() {
        return (
            <Row>
                <Col className='d-flex align-items-center'>
                    <Card.Text>{this.renderRoomMetaData()}</Card.Text>
                </Col>
                <Col>
                    <RoomListItemActions
                        room={this.props.room}
                        onError={(error) => this.setState({ error })}
                    />
                </Col>
            </Row>
        )
    }

    renderComponentTitle() {
        const { room } = this.props
        return <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
    }

    renderComponentFooter() {
        const { error } = this.state
        if (!error) {
            return null
        }
        return (
            <Row>
                <Col style={{ color: 'red' }}>{error}</Col>
            </Row>
        )
    }

    render() {
        return (
            <RoomListItem
                title={this.renderComponentTitle()}
                content={this.renderComponentContent()}
                footer={this.renderComponentFooter()}
            />
        )
    }
}

export default RoomListItemContainer;
