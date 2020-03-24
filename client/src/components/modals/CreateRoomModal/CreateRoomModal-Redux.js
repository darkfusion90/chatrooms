import React from 'react';
import { connect } from 'react-redux';

import CreateRoomModalContainer from './CreateRoomModal-Container'
import { createRoom as createRoomAction } from '../../../redux/actions/room-actions';
import { hideModal as hideModalAction } from '../../../redux/actions/modal-actions';

const CreateRoomModalRedux = (props) => {
    return <CreateRoomModalContainer {...props} />
}

const mapStateToProps = (state) => {
    return {
        isModalVisible: state.modal.isModalOpen && state.modal.modalName === 'CreateRoom',
        createRoomFormData: state.form['createRoomForm']
    }
}

export default connect(
    mapStateToProps,
    { createRoom: createRoomAction, hideModal: hideModalAction }
)(CreateRoomModalRedux);

