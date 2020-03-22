import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import { DeleteRoomForm } from './components'
import GenericModal from '../GenericModal';
import ProgressButton, {
    PROGRESS_INITIAL,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'

const DeleteRoomModalView = ({
    deleteRoomProgress,
    deleteRoomFormData,
    modalProps,
    isModalVisible,
    hideModal,
    onFormSubmit
}) => {

    const renderDeleteButton = () => {
        let buttonProps = {}
        if (deleteRoomProgress === PROGRESS_INITIAL) {
            buttonProps = { type: 'submit', 'form': 'delete-room-form', variant: 'danger' }
        }

        const syncErrors = deleteRoomFormData ? deleteRoomFormData.syncErrors : null
        const hasErrors = syncErrors && syncErrors.roomName

        buttonProps = { ...buttonProps, 'disabled': hasErrors }

        return (
            <ProgressButton
                progress={deleteRoomProgress}
                labelProgressInitial='Delete Room'
                labelProgressPending='Deleting Room...'
                labelProgressSuccess='Room Deleted'
                labelProgressFail='Room Deletion Failed'
                buttonProps={buttonProps}
            />
        )
    }

    const getModalActions = () => {
        const isTaskCompleted = () => {
            return deleteRoomProgress === PROGRESS_SUCCESS ||
                deleteRoomProgress === PROGRESS_FAIL
        }
        const cancelButtonText = isTaskCompleted() ? 'Go Back' : 'Cancel'
        return (
            <>
                <Button variant='outline-secondary' onClick={hideModal}>{cancelButtonText}</Button>
                {renderDeleteButton()}
            </>
        )
    }

    const getModalContent = () => {
        const { room } = modalProps
        const roomName = room ? room.name : '<unknown>'
        return (
            <Row>
                <Col sm={12}>
                    <DeleteRoomForm
                        onFormSubmit={onFormSubmit}
                        room={room}
                    />
                </Col>
                <Col>
                    To delete the room <strong>{roomName}</strong> type in the name of the room above
                </Col>
            </Row>
        )
    }

    return (
        <GenericModal
            header="Delete Room"
            actions={getModalActions()}
            content={getModalContent()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    )
}

export default DeleteRoomModalView