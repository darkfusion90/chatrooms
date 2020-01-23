import React from 'react';
import Button from 'react-bootstrap/Button';

import Snackbar from './Snackbar';
import ModalContainer from '../ModalContainer';

const LandingPage = (props) => {
    return (
        <div className="landing-page">
            <div className="inner-wrapper">
                <p>Welcome to Chatrooms!</p>

                <div className="buttons-container">
                    <Button onClick={props.onCreateRoomButtonClick}>
                        Create Room
                    </Button>

                    <Button onClick={props.onJoinRoomButtonClick}>
                        Join Room
                    </Button>
                </div>

            </div>
            <ModalContainer {...props.modalProps}/>
            <Snackbar {...props.snackbarProps}/>
        </div>
    );
}

export default LandingPage;
