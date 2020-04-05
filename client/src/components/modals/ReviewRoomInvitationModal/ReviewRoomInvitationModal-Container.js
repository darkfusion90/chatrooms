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
        const {
            markNotificationAsReviewed,
            modalProps: { notificationId }
        } = this.props
        markNotificationAsReviewed(notificationId)
    }

    onAcceptInvitationFail = () => {
        this.setState({ acceptInvitationProgress: PROGRESS_FAIL })
    }

    onAcceptInvitationButtonClick = () => {
        this.onAcceptInvitationPending()
        delay('any', this.onAcceptInvitationSuccess, this.onAcceptInvitationFail)
    }

    onIgnoreInvitationButtonClick = () => {
        const {
            hideModal,
            markNotificationAsReviewed,
            modalProps: { notificationId }
        } = this.props

        markNotificationAsReviewed(notificationId)
        hideModal()
    }

    render() {
        const isTaskCompleted = [
            PROGRESS_SUCCESS, PROGRESS_FAIL
        ].includes(this.state.acceptInvitationProgress)

        return (
            <ReviewRoomInvitationModalView
                onIgnoreButtonClick={this.onIgnoreInvitationButtonClick}
                onAcceptButtonClick={this.onAcceptInvitationButtonClick}
                isTaskCompleted={isTaskCompleted}
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default ReviewRoomInvitationModalContainer;
