import React from 'react';

import InviteUserModalView from './InviteUserModal-View'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'
import delay from '../../../helpers/delay'

class InviteUserModalContainer extends React.Component {
    state = {
        inviteUserProgress: PROGRESS_INITIAL
    }

    onInviteUserPending = () => {
        this.setState({ inviteUserProgress: PROGRESS_PENDING })
    }

    onInviteUserSuccess = () => {
        this.setState({ inviteUserProgress: PROGRESS_SUCCESS })
    }

    onInviteUserFailure = () => {
        this.setState({ inviteUserProgress: PROGRESS_FAIL })
    }

    onInviteUserFormSubmit = () => {
        this.onInviteUserPending()
        delay('SomeValue', this.onInviteUserSuccess, this.onInviteUserFailure)
    }

    render() {
        return (
            <InviteUserModalView
                onFormSubmit={this.onInviteUserFormSubmit}
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default InviteUserModalContainer;
