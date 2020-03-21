import React from 'react';
import { connect } from 'react-redux';

import DeleteRoomModalView from './DeleteRoomModal-View'

import hideModalAction from '../../../actions/hideModal';
import deleteRoomAction from '../../../actions/deleteRoom'
import delay from '../../../helpers/delay'

class DeleteRoomModalRedux extends React.Component {
    onDeleteRoomFormSubmit = () => {
        const {
            onDeleteRoomPending,
            onDeleteRoomSuccess,
            onDeleteRoomFail,
            modalProps: room
        } = this.props

        onDeleteRoomPending()
        delay(room.roomId, onDeleteRoomSuccess, onDeleteRoomFail)
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
    { hideModal: hideModalAction, deleteModal: deleteRoomAction }
)(DeleteRoomModalRedux);