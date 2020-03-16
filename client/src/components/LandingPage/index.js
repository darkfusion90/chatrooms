import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import './LandingPage.scss';
import showModal from '../../actions/showModal'
import hideModal from '../../actions/hideModal'

const LandingPage = (props) => {
    return (
        <div className="landing-page compensate-header">
            <div className="inner-wrapper">
                <p>Welcome to ChatRooms!</p>

                <div className="buttons-container">
                    <Button onClick={() => props.showModal('CreateRoom')}>
                        Create Room
                    </Button>

                    <Button onClick={() => props.showModal('JoinRoom')}>
                        Join Room
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default connect(null, { showModal, hideModal })(LandingPage);
