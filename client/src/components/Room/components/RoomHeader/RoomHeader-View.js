import React from 'react';
import { Container } from 'react-bootstrap';

import RoomHeaderActions from '../RoomHeaderActions'
import './RoomHeader-Style.scss'


const RoomHeader = ({ room, currentUserMemberId, className }) => {
    return (
        <Container fluid className={`room-page-sub-header ${className}`}>
            <div className='d-flex align-items-center h-100'>
                <div className='room-name-container text-overflow-ellipses'>
                    {room.name}
                </div>
                <div className='room-actions-container'>
                    <div className='d-flex justify-content-around'>
                        <RoomHeaderActions
                            room={room}
                            currentUserMemberId={currentUserMemberId}

                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}


export default RoomHeader