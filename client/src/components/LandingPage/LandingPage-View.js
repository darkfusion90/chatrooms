import React from 'react';

import {
    CreateRoomModalTrigger,
    JoinRoomModalTrigger
} from '../standalone/RoomModalTriggers'

import './LandingPage-Style.scss';

const LandingPage = () => {
    return (
        <div className="landing-page compensate-header">
            <div className="inner-wrapper">
                <p>Welcome to ChatRooms!</p>

                <div className="buttons-container">
                    <CreateRoomModalTrigger>
                        Create Room
                    </CreateRoomModalTrigger>
                    <JoinRoomModalTrigger variant='outline-primary'>
                        Join Room By Id
                    </JoinRoomModalTrigger>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
