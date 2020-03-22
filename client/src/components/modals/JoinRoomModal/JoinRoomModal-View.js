import React from 'react';
import { Button } from 'react-bootstrap'

import GenericModal from '../GenericModal'
import { JoinRoomForm } from './components'

const JoinRoomModalView = ({ isModalVisible, hideModal, onFormSubmit }) => {
    const getModalActions = () => {
        return (
            <>
                <Button onClick={hideModal} variant='outline-secondary'>
                    Cancel
                </Button>
                <Button type="submit" form="join-room-form">
                    Join Room
                </Button>
            </>
        );
    }

    const getModalContent = () => {
        return <JoinRoomForm onFormSubmit={onFormSubmit}/>
    }

    return (
        <GenericModal
            header="Join Room By Id"
            actions={getModalActions()}
            content={getModalContent()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    );
}

export default JoinRoomModalView;
