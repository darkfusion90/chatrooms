import React from 'react';
import { Button } from 'react-bootstrap'

import GenericModal from '../GenericModal'
import { InviteUserForm } from './components'
import { InviteUserButton } from '../../standalone/RoomActionButtons'

const InviteUserModalView = ({
    isModalVisible,
    hideModal,
    onFormSubmit,
    inviteUserProgress
}) => {
    const getModalActions = () => {
        const getRoomActionButton = () => {
            return (
                <InviteUserButton
                    progress={inviteUserProgress}
                    propsProgressInitial={{
                        type: 'submit',
                        'form': 'invite-user-form'
                    }}
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
        return <InviteUserForm onFormSubmit={onFormSubmit} />
    }

    return (
        <GenericModal
            header='Invite User'
            actions={getModalActions()}
            content={getModalContent()}
            visible={isModalVisible}
            hideModal={hideModal}
        />
    );
}

export default InviteUserModalView;
