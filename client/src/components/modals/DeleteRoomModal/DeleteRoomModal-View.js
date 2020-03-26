import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import { DeleteRoomForm } from './components'
import GenericModal from '../GenericModal';
import {
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'
import { DeleteRoomButton } from '../../standalone/RoomActionButtons'

const DeleteRoomModalView = ({
    deleteRoomProgress,
    deleteRoomFormData,
    modalProps,
    isModalVisible,
    hideModal,
    onFormSubmit
}) => {

    const renderDeleteButton = () => {
        const syncErrors = deleteRoomFormData ? deleteRoomFormData.syncErrors : null
        const hasErrors = syncErrors && syncErrors.roomName

        return (
            <DeleteRoomButton
                progress={deleteRoomProgress}
                propsProgressInitial={{
                    type: 'submit',
                    'form': 'delete-room-form',
                    variant: 'danger',
                    disabled: hasErrors,
                    className: `cursor-${hasErrors ? 'not-allowed' : 'pointer'}`
                }}
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
                    <p className='word-wrap-break-word'>
                        To delete the room <strong>{roomName}</strong> type in the name of the room above
                    </p>
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