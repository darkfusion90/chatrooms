import React from 'react'
import { connect } from 'react-redux'

import CreateRoomModal from './CreateRoomModal/'
import JoinRoomModal from './JoinRoomModal/'
import DeleteRoomModal from './DeleteRoomModal/'
import LeaveRoomModal from './LeaveRoomModal/'
import InviteUserModal from './InviteUserModal'

const getModalComponentToShow = (modalName) => {
    switch (modalName) {
        case 'CreateRoom':
            return <CreateRoomModal />
        case 'JoinRoom':
            return <JoinRoomModal />
        case 'DeleteRoom':
            return <DeleteRoomModal />
        case 'LeaveRoom':
            return <LeaveRoomModal />
        case 'InviteUser':
            return <InviteUserModal />
        default:
            return null
    }
}

const ModalContainer = (props) => {
    if (!props.modal.isModalOpen) {
        return null
    }

    return getModalComponentToShow(props.modal.modalName)
}

const mapStateToProps = (state) => {
    return { modal: state.modal }
}

export default connect(mapStateToProps)(ModalContainer);
