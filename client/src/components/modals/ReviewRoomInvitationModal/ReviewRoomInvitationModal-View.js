import React from 'react';
import Button from 'react-bootstrap/Button'

import GenericModal from '../GenericModal'
import { AcceptRoomInvitationButton } from '../../standalone/RoomActionButtons'

const ReviewRoomInvitationModalView = ({
    acceptInvitationProgress,
    modalProps: { invitation },
    isModalVisible,
    hideModal,
    isTaskCompleted,
    onIgnoreButtonClick,
    onAcceptButtonClick
}) => {

    const getInvitationMessage = () => {
        const { inviter, room } = invitation
        const inviterUsername = inviter && inviter.username
        const roomName = room && room.name

        return (
            <p className='mb-0'>
                <em>{inviterUsername}</em>{' '}
                        invited you to join the room{' '}
                <em>{roomName}</em>
            </p>
        )
    }

    const getActions = () => {
        return (
            <>
                <Button
                    variant='outline-secondary'
                    onClick={isTaskCompleted ? hideModal : onIgnoreButtonClick}
                >
                    {isTaskCompleted ? 'Go Back' : 'Ignore'}
                </Button>
                <AcceptRoomInvitationButton
                    progress={acceptInvitationProgress}
                    propsProgressInitial={{
                        onClick: onAcceptButtonClick
                    }}
                />
            </>
        )
    }

    return (
        <GenericModal
            header='Review Room Invitation'
            content={getInvitationMessage()}
            actions={getActions()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    )
}

export default ReviewRoomInvitationModalView;
