import React from 'react';

import ReviewRoomInvitationModalView from './ReviewRoomInvitationModal-View'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'
import delay from '../../../helpers/delay'

class ReviewRoomInvitationModalContainer extends React.Component {
    state = { acceptInvitationProgress: PROGRESS_INITIAL }

    onAcceptInvitationPending = () => {
        this.setState({ acceptInvitationProgress: PROGRESS_PENDING })
    }

    onAcceptInvitationSuccess = () => {
        this.setState({ acceptInvitationProgress: PROGRESS_SUCCESS })
    }

    onAcceptInvitationFail = () => {
        this.setState({ acceptInvitationProgress: PROGRESS_FAIL })
    }

    onAcceptInvitationButtonClick = () => {
        this.onAcceptInvitationPending()
        delay('any', this.onAcceptInvitationSuccess, this.onAcceptInvitationFail)
    }

    onIgnoreInvitationButtonClick = () => {
        //TODO: Set corresponding notification (from modalProps) to status "reviewed"
        this.props.hideModal()
    }

    render() {
        return (
            <ReviewRoomInvitationModalView
                onIgnoreButtonClick={this.onIgnoreInvitationButtonClick}
                onAcceptButtonClick={this.onAcceptInvitationButtonClick}
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default ReviewRoomInvitationModalContainer;
