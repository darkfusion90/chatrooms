import React from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroupItem } from 'react-bootstrap';

import RoomListItemActions from '../RoomListItemActions'
import convertISODateToReadableString from '../../../../helpers/convertISODateToReadableString'

const RoomListItem = ({
    room,
    onJoinRoomButtonClick,
    joinRoomProgress
}) => {

    if (!room) return null

    const getTitle = () => {
        return <Link to={`/rooms/${room._id}`}>{room.name}</Link>
    }

    const getSubtitle = () => {
        const roomOwner = room.createdBy
        const roomCreatedBy = roomOwner ? roomOwner.username : '<unknown>'
        const roomCreatedAt = convertISODateToReadableString(room.createdAt)

        return (
            <span className='max-width-100 subtitle'>
                Created {roomCreatedAt} by {roomCreatedBy}
            </span>
        )
    }

    return (
        <ListGroupItem className='px-0'>
            <Container fluid className='d-flex flex-row justify-content-between'>
                <div className='text-overflow-ellipses'>
                    <h5 className='max-width-100 text-overflow-ellipses'>{getTitle()}</h5>
                    {getSubtitle()}
                </div>
                <div>
                    <RoomListItemActions
                        room={room}
                        onJoinRoomButtonClick={onJoinRoomButtonClick}
                        joinRoomProgress={joinRoomProgress}
                    />
                </div>
            </Container>
        </ListGroupItem>
    )
}

export default RoomListItem;
