import React from 'react';
import { connect } from 'react-redux';

import JoinRoomModalContainer from './JoinRoomModal-Container'
import { hideModal } from '../../../redux/actions/modal-actions'
import { joinRoom } from '../../../redux/actions/room-actions'

const JoinRoomModalRedux = (props) => {
    return <JoinRoomModalContainer {...props} />
}

const mapStateToProps = (state) => {
    const { user } = state
    return {
        isModalVisible: state.modal.isModalOpen && state.modal.modalName === 'JoinRoom',
        joinRoomFormData: state.form['joinRoomForm'],
        currentUserId: user && user.user && user.user._id
    }
}

export default connect(mapStateToProps, { hideModal, joinRoom })(JoinRoomModalRedux);
