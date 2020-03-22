import React from 'react';
import Button from 'react-bootstrap/Button'

import { WithModalTrigger } from '../hoc'
import './LandingPage-Style.scss';


const LandingPage = () => {
    return (
        <div className="landing-page compensate-header">
            <div className="inner-wrapper">
                <p>Welcome to ChatRooms!</p>

                <div className="buttons-container">
                    <WithModalTrigger
                        component={Button}
                        content='Create Room'
                        modalName='CreateRoom'
                    />
                    <WithModalTrigger
                        component={Button}
                        componentProps={{ variant: 'outline-primary' }}
                        content='Join Room By Id'
                        modalName='JoinRoom'
                    />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
