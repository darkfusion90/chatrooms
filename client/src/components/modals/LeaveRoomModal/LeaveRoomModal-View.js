import React from 'react';
import { Button } from 'react-bootstrap';

import GenericModal from '../GenericModal';
import { LeaveRoomButton } from '../../standalone/RoomActionButtons'
import {
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'

const LeaveRoomModalView = ({
    room,
    isModalVisible,
    hideModal,
    onLeaveRoomButtonClick,
    leaveRoomProgress
}) => {

    const getModalContent = () => {
        const roomName = <strong>{room ? room.name : '<unknown>'}</strong>
        return <p className='word-wrap-break-word'>
            Are you sure you want to leave the room {roomName}?
        </p>
    }

    const renderLeaveRoomButton = () => {
        return (
            <LeaveRoomButton
                progress={leaveRoomProgress}
                propsProgressInitial={{
                    variant: 'danger',
                    onClick: onLeaveRoomButtonClick
                }}
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