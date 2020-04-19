import React from 'react';
import { connect } from 'react-redux';

import LeaveRoomModalView from './LeaveRoomModal-View'
import { hideModal as hideModalAction } from '../../../redux/actions/modal-actions';
import { leaveRoom as leaveRoomAction } from '../../../redux/actions/room-actions';

const LeaveRoomModalRedux = ({ modalProps: { room, currentUserMemberId }, ...otherProps }) => {
    const onLeaveRoomButtonClick = () => {

        const { leaveRoom, onLeaveRoomPending, onLeaveRoomSuccess, onLeaveRoomFail } = otherProps
        onLeaveRoomPending()
        leaveRoom(room._id, currentUserMemberId, onLeaveRoomSuccess, onLeaveRoomFail)
    }

    const {
        isModalVisible,
        hideModal,
        leaveRoomProgress
    } = otherProps

    return (
        <LeaveRoomModalView
            room={room}
            hideModal={hideModal}
            isModalVisible={isModalVisible}
            leaveRoomProgress={leaveRoomProgress}
            onLeaveRoomButtonClick={onLeaveRoomButtonClick}
        />
    );
}

const mapStateToProps = (state) => {
    const { modal } = state
    return {
        isModalVisible: modal.isModalOpen && modal.modalName === 'LeaveRoom',
        modalProps: modal.modalProps
    }
}

export default connect(
    mapStateToProps,
    { hideModal: hideModalAction, leaveRoom: leaveRoomAction }
)(LeaveRoomModalRedux);