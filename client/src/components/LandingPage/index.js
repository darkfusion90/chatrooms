import React from 'react';

import CreateRoomButton from '../CreateRoomButton'
import JoinRoomButton from '../JoinRoomButton'
import './LandingPage.scss';

const LandingPage = () => {
    return (
        <div className="landing-page compensate-header">
            <div className="inner-wrapper">
                <p>Welcome to ChatRooms!</p>

                <div className="buttons-container">
                    <CreateRoomButton />
                    <JoinRoomButton />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
