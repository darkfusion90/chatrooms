import React from 'react';
import { Button } from 'react-bootstrap'

import GenericModal from '../GenericModal'
import { JoinRoomForm } from './components'
import { JoinRoomButton, SendRoomJoinRequestButton } from '../../standalone/RoomActionButtons'

const JoinRoomModalView = ({
    isModalVisible,
    hideModal,
    onFormSubmit,
    joinRoomFormData,
    joinRoomProgress
}) => {
    const getModalActions = () => {
        const getRoomActionButton = () => {
            const asyncErrors = joinRoomFormData && joinRoomFormData.asyncErrors
            const hasErrors = joinRoomFormData && (
                joinRoomFormData.syncErrors || asyncErrors || joinRoomFormData.asyncValidating
            )

            const roomActionButtonProps = {
                type: 'submit',
                form: 'join-room-form',
                disabled: hasErrors,
                className: `cursor-${hasErrors ? 'not-allowed' : 'pointer'}`
            }
            console.log('asyncErrors: ', asyncErrors)
            if (asyncErrors && asyncErrors.roomId.isPrivateRoomError) {
                return (
                    <SendRoomJoinRequestButton
                        progress={joinRoomProgress}
                        propsProgressInitial={roomActionButtonProps}
                    />
                )
            }

            return (
                <JoinRoomButton
                    progress={joinRoomProgress}
                    propsProgressInitial={roomActionButtonProps}
                />
            )
        }

        return (
            <>
                <Button onClick={hideModal} variant='outline-secondary'>
                    Cancel
                </Button>
                {getRoomActionButton()}
            </>
        );
    }

    const getModalContent = () => {
        return <JoinRoomForm onFormSubmit={onFormSubmit} />
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
