import React from 'react';
import isEmpty from 'is-empty'

import InviteUserModalView from './InviteUserModal-View'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'
import { searchUsers, getUserByUsername, sendRoomInvitation } from '../../../server-communication/httpServer';

class InviteUserModalContainer extends React.Component {
    state = {
        inviteUserProgress: PROGRESS_INITIAL,
        matchingUsers: []
    }

    async componentDidUpdate(prevProps) {
        const currentUsername = this.getUsernameFromInviteUserForm(this.props.inviteUserForm)
        const prevUsername = this.getUsernameFromInviteUserForm(prevProps.inviteUserForm)
        if (prevUsername === currentUsername) {
            return
        }

        if (isEmpty(currentUsername)) {
            this.setState({ matchingUsers: [] })
        }

        let matchingUsers;
        try {
            matchingUsers = await searchUsers(currentUsername)
        } catch{
            matchingUsers = { data: { payload: [] } }
        } finally {
            this.setState({ matchingUsers: matchingUsers.data.payload })
        }
    }

    onInviteUserPending = () => {
        this.setState({ inviteUserProgress: PROGRESS_PENDING })
    }

    onInviteUserSuccess = ({ data }) => {
        console.log('user: ', data)
        this.setState({ inviteUserProgress: PROGRESS_SUCCESS })
    }

    onInviteUserFailure = ({ response }) => {
        console.log('fail user: ', response)
        this.setState({ inviteUserProgress: PROGRESS_FAIL })
    }

    onInviteUserFormSubmit = ({ inviteeUsername }) => {
        this.onInviteUserPending()
        getUserByUsername(inviteeUsername)
            .then((response) => {
                const user = response.data
                const { room } = this.props.modalProps
                sendRoomInvitation(user._id, room.roomId, this.onInviteUserSuccess, this.onInviteUserFailure)
            }).catch(this.onInviteUserFailure)
    }

    getUsernameFromInviteUserForm = (inviteUserForm) => {
        const formValues = inviteUserForm && inviteUserForm.values
        const username = formValues && formValues.inviteeUsername
        return username ? username.trim() : username
    }

    render() {
        const queryUsername = this.getUsernameFromInviteUserForm(this.props.inviteUserForm)
        return (
            <InviteUserModalView
                onFormSubmit={this.onInviteUserFormSubmit}
                queryUsername={queryUsername}
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default InviteUserModalContainer;
