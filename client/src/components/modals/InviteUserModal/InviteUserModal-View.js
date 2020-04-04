import React from 'react';
import { Button, Container } from 'react-bootstrap'

import GenericModal from '../GenericModal'
import { InviteUserForm, MatchingUserList } from './components'
import { InviteUserButton } from '../../standalone/RoomActionButtons'


const InviteUserModalView = ({
    isModalVisible,
    hideModal,
    onFormSubmit,
    matchingUsers,
    queryUsername,
    selectUsername,
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
        return (
            <Container>
                <InviteUserForm onFormSubmit={onFormSubmit} />
                <hr />
                <MatchingUserList
                    userList={matchingUsers}
                    queryUsername={queryUsername}
                    onItemClick={(username) => selectUsername(username)}
                />
            </Container>
        )
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
