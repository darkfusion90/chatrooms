import React from 'react';
import Button from 'react-bootstrap/Button';

import GenericModal from '../GenericModal';
import { CreateRoomForm } from './components'

import { DismissibleAlert } from '../../standalone'

const CreateRoomModalView = ({ isModalVisible, alertProps, hideAlert, hideModal, onFormSubmit }) => {
    const hideAlertAndModal = () => {
        hideAlert()
        hideModal()
    }

    const getModalActions = () => {
        return (
            <>
                <Button variant='secondary' onClick={hideAlertAndModal}>Cancel</Button>
                <Button form='create-room-form' type='submit'>Create Room</Button>
            </>
        );
    }

    const getModalContent = () => {
        const getAlertDismissAction = () => {
            if (alertProps.show && alertProps.variant === 'success') {
                return (
                    <Button variant='outline-success' onClick={hideAlertAndModal}>
                        Back to home
                    </Button>
                )
            }
        }

        return (
            <>
                <DismissibleAlert
                    {...alertProps}
                    onDismiss={hideAlert}
                    dismissAction={getAlertDismissAction}
                />
                <CreateRoomForm onFormSubmit={onFormSubmit} />
            </>
        )
    }

    return (
        <GenericModal
            header="Create Room"
            actions={getModalActions()}
            content={getModalContent()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    );
}

export default CreateRoomModalView

