import React from 'react';
import { connect } from 'react-redux'

import ReviewRoomInvitationModalContainer from './ReviewRoomInvitationModal-Container'
import { hideModal } from '../../../redux/actions/modal-actions'
import { markNotificationAsReviewed } from '../../../redux/actions/notification-actions'

const ReviewRoomInvitationModalRedux = (props) => {
    return <ReviewRoomInvitationModalContainer {...props} />
}

const mapStateToProps = (state) => {
    const { modal } = state
    return {
        isModalVisible: modal.isModalOpen && modal.modalName === 'ReviewRoomInvitation',
        modalProps: modal.modalProps
    }
}

export default connect(
    mapStateToProps,
    { hideModal, markNotificationAsReviewed }
)(ReviewRoomInvitationModalRedux);