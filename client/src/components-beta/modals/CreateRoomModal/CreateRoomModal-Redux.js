import React from 'react';
import { connect } from 'react-redux';

import CreateRoomModalView from './CreateRoomModal-View'
import createRoom from '../../../actions/createRoom';
import hideModal from '../../../actions/hideModal';

class CreateRoomModalRedux extends React.Component {
    onFormSubmit = ({ roomName, roomType }) => {
        const { onCreateRoomSuccess, onCreateRoomFailure } = this.props
        this.props.createRoom(roomName, roomType, onCreateRoomSuccess, onCreateRoomFailure);
    }

    render() {
        const { isModalVisible, hideModal, hideAlert, alertProps } = this.props

        return (
            <CreateRoomModalView
                isModalVisible={isModalVisible}
                alertProps={alertProps}
                hideAlert={hideAlert}
                hideModal={hideModal}
                onFormSubmit={this.onFormSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { isModalVisible: state.modal.isModalOpen && state.modal.modalName === 'CreateRoom' }
}

export default connect(
    mapStateToProps,
    { createRoom, hideModal }
)(CreateRoomModalRedux);

