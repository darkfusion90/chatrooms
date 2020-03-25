import React from 'react';
import { Button } from 'react-bootstrap'

import GenericModal from '../GenericModal'
import { JoinRoomForm } from './components'
import { JoinRoomButton } from '../../standalone/RoomActionButtons'

const JoinRoomModalView = ({
    isModalVisible,
    hideModal,
    onFormSubmit,
    joinRoomFormData,
    joinRoomProgress
}) => {
    const getModalActions = () => {
        const getJoinRoomButton = () => {
            const hasErrors = joinRoomFormData && joinRoomFormData.syncErrors

            return (
                <JoinRoomButton
                    progress={joinRoomProgress}
                    propsProgressInitial={{
                        type: 'submit',
                        form: 'join-room-form',
                        disabled: hasErrors,
                        className: `cursor-${hasErrors ? 'not-allowed' : 'pointer'}`
                    }}
                />
            )
        }

        return (
            <>
                <Button onClick={hideModal} variant='outline-secondary'>
                    Cancel
                </Button>
                {getJoinRoomButton()}
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
