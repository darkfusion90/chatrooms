import React from 'react'
import { connect } from 'react-redux'

import CreateRoomModal from '../../components/modals/CreateRoomModal'
import JoinRoomModal from '../../components/modals/JoinRoomModal'
import DeleteRoomModal from '../../components/modals/DeleteRoomModal'

const getModalComponentToShow = (modalName) => {
    switch (modalName) {
        case 'CreateRoom':
            return <CreateRoomModal />
        case 'JoinRoom':
            return <JoinRoomModal />
        case 'DeleteRoom':
            return <DeleteRoomModal />
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
