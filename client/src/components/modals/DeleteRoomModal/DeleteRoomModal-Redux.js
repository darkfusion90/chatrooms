import React from 'react';
import { connect } from 'react-redux';

import DeleteRoomModalView from './DeleteRoomModal-View'

import { hideModal as hideModalAction } from '../../../redux/actions/modal-actions';
import { deleteRoom as deleteRoomAction } from '../../../redux/actions/room-actions'

class DeleteRoomModalRedux extends React.Component {
    onDeleteRoomFormSubmit = () => {
        const {
            onDeleteRoomPending,
            onDeleteRoomSuccess,
            onDeleteRoomFail,
            deleteRoom,
            modalProps: { room }
        } = this.props

        onDeleteRoomPending()
        deleteRoom(room.roomId, onDeleteRoomSuccess, onDeleteRoomFail)
    }

    render() {
        const {
            deleteRoomForm,
            deleteRoomProgress,
            modalProps,
            isModalVisible,
            hideModal
        } = this.props

        return (
            <DeleteRoomModalView
                deleteRoomFormData={deleteRoomForm}
                deleteRoomProgress={deleteRoomProgress}
                modalProps={modalProps}
                isModalVisible={isModalVisible}
                hideModal={hideModal}
                onFormSubmit={this.onDeleteRoomFormSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { modal } = state
    return {
        isModalVisible: modal.isModalOpen && modal.modalName === 'DeleteRoom',
        modalProps: modal.modalProps,
        deleteRoomForm: state.form['delete-room-form']
    }
}

export default connect(
    mapStateToProps,
    { hideModal: hideModalAction, deleteRoom: deleteRoomAction }
)(DeleteRoomModalRedux);