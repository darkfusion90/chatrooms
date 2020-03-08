import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Row, Col } from 'react-bootstrap';

import convertISODateToReadableString from '../../helpers/convertISODateToReadableString';
import RoomListItem from '../../components/RoomListItem'

const renderRoomMetaData = (room) => {
    const roomOwner = room.createdBy
    const roomCreatedBy = roomOwner ? roomOwner.username : '<unknown>'
    const roomCreatedAt = convertISODateToReadableString(room.createdAt)

    return `Created ${roomCreatedAt} by ${roomCreatedBy}`
}

const renderRoomActions = (room, currentUser) => {
    const adminActions = <Button variant='danger'>Delete</Button>

    const isRoomAdmin = (roomMember) => {
        return roomMember && roomMember.memberType === 'admin'
    }

    const getActionsForRoomMember = (roomMember, roomId) => {
        return (
            <ButtonGroup>
                <Link to={`/rooms/${roomId}`} component={Button}>Open</Link>
                {isRoomAdmin(roomMember) ? adminActions : null}
            </ButtonGroup>
        )
    }

    const getActionsForNonRoomMember = () => {
        return <Button>Join</Button>
    }


    const getMemberRefInRoom = (room, queryUserId) => {
        return room.members.filter(roomMember => roomMember.user._id === queryUserId)
    }


    if (currentUser) {
        const currentUserRoomMemberReference = getMemberRefInRoom(room, currentUser._id)[0]
        if (!currentUserRoomMemberReference) {
            return getActionsForNonRoomMember()
        } else {
            return getActionsForRoomMember(currentUserRoomMemberReference, room.roomId)
        }
    }
}

const renderComponentTitle = (room) => {
    return <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
}

const renderComponentContent = (room, currentUser) => {
    return (
        <Row>
            <Col className='d-flex align-items-center'>
                <Card.Text>{renderRoomMetaData(room)}</Card.Text>
            </Col>
            <Col>
                {renderRoomActions(room, currentUser)}
            </Col>
        </Row>
    )
}

const RoomListItemContainer = ({ room, currentUser }) => {
    return (
        <RoomListItem
            title={renderComponentTitle(room)}
            content={renderComponentContent(room, currentUser)}
        />
    )
}

const mapStateToProps = (state) => {
    return { currentUser: state.user.user }
}

export default connect(mapStateToProps)(RoomListItemContainer);
