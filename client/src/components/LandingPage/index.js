import React from 'react';
import Button from 'react-bootstrap/Button'

import ModalTrigger from '../modals/ModalTrigger'
import './LandingPage.scss';


const LandingPage = () => {
    return (
        <div className="landing-page compensate-header">
            <div className="inner-wrapper">
                <p>Welcome to ChatRooms!</p>

                <div className="buttons-container">
                    <ModalTrigger
                        component={Button}
                        content='Create Room'
                        modalName='CreateRoom'
                    />
                    <ModalTrigger
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
