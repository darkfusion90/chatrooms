import React from 'react';
import Button from 'react-bootstrap/Button';

import GenericModal from '../GenericModal';
import { CreateRoomForm } from './components'

import { CreateRoomButton } from '../../standalone/RoomActionButtons'

const CreateRoomModalView = ({
    isModalVisible,
    hideModal,
    createRoomFormData,
    createRoomProgress,
    onFormSubmit
}) => {
    const getModalActions = () => {
        const hasErrors = createRoomFormData && createRoomFormData.syncErrors
        return (
            <>
                <Button variant='secondary' onClick={hideModal}>Cancel</Button>
                <CreateRoomButton
                    progress={createRoomProgress}
                    form='create-room-form'
                    type='submit'
                    disabled={hasErrors}
                    className={`cursor-${hasErrors ? 'not-allowed' : 'pointer'}`}
                />
            </>
        );
    }

    const getModalContent = () => {
        return <CreateRoomForm onFormSubmit={onFormSubmit} />
    }
    
    return (
        <GenericModal
            header='Create Room'
            actions={getModalActions()}
            content={getModalContent()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    );
}

export default CreateRoomModalView

