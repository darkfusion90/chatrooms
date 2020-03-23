import React from 'react';
import { connect } from 'react-redux';

import JoinRoomModalView from './JoinRoomModal-View'
import { hideModal } from '../../../redux/actions/modal-actions'

import delay from '../../../helpers/delay'

class JoinRoomModalRedux extends React.Component {
    onFormSubmit = (formValues) => {
        delay(formValues.roomId, () => console.log('Success!'), () => console.log('Fail!'))
    }

    render() {
        console.log('yayaya')
        const { isModalVisible, hideModal } = this.props
        return (
            <JoinRoomModalView
                onFormSubmit={this.onFormSubmit}
                isModalVisible={isModalVisible}
                hideModal={hideModal}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { isModalVisible: state.modal.isModalOpen && state.modal.modalName === 'JoinRoom' }
}

export default connect(mapStateToProps, { hideModal })(JoinRoomModalRedux);
