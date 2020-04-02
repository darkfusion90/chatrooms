import React from 'react';
import { ButtonGroup } from 'react-bootstrap'

import {
    CreateRoomModalTrigger,
    JoinRoomModalTrigger
} from '../standalone/RoomModalTriggers'

import './LandingPage-Style.scss';

const LandingPage = () => {
    return (
        <div className='landing-page compensate-header w-100'>
            <div className='d-flex flex-column align-items-center'>
                <p className='welcome-msg'>Welcome to ChatRooms!</p>

                <ButtonGroup>
                    <CreateRoomModalTrigger>
                        Create Room
                    </CreateRoomModalTrigger>
                    <JoinRoomModalTrigger variant='outline-primary'>
                        Join Room By Id
                    </JoinRoomModalTrigger>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default LandingPage;
