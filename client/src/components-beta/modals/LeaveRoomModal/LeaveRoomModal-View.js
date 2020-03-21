import React from 'react';
import { Button } from 'react-bootstrap';

import GenericModal from '../GenericModal';
import ProgressButton, {
    PROGRESS_INITIAL,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'

const LeaveRoomModalView = ({ room, isModalVisible, hideModal, onLeaveRoomButtonClick, leaveRoomProgress }) => {
    console.log('room: ', room)
    const getModalContent = () => {
        console.log('room content context: ', room)
        const roomName = room.name
        console.log('room name: ', roomName)
        return (
            <p>Are you sure you want to leave the room{' '}
                <strong>{roomName}</strong>
                ?
            </p>
        )
    }

    const renderLeaveRoomButton = () => {
        let buttonProps = {}
        if (leaveRoomProgress === PROGRESS_INITIAL) {
            buttonProps = { variant: 'danger', onClick: onLeaveRoomButtonClick }
        }

        return (
            <ProgressButton
                progress={leaveRoomProgress}
                labelProgressInitial='Leave Room'
                labelProgressPending='Leaving Room...'
                labelProgressSuccess='Left Room'
                labelProgressFail='Error Leaving Room'
                buttonProps={buttonProps}
            />
        )
    }

    const getModalActions = () => {
        const isTaskCompleted = () => {
            return leaveRoomProgress === PROGRESS_SUCCESS ||
                leaveRoomProgress === PROGRESS_FAIL
        }
        const cancelButtonText = isTaskCompleted() ? 'Go Back' : 'Cancel'
        return (
            <>
                <Button variant='outline-secondary' onClick={hideModal}>{cancelButtonText}</Button>
                {renderLeaveRoomButton()}
            </>
        )
    }

    return (
        <GenericModal
            header="Leave Room"
            actions={getModalActions()}
            content={getModalContent()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    );
}

export default LeaveRoomModalView