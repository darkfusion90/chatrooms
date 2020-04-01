import React from 'react'
import { connect } from 'react-redux'

import InviteUserModalContainer from './InviteUserModal-Container'
import { hideModal } from '../../../redux/actions/modal-actions';


const InviteUserModalRedux = (props) => {
    return <InviteUserModalContainer {...props} />
}

const mapStateToProps = (state) => {
    const { modal: { isModalOpen, modalName, modalProps } } = state
    return {
        isModalVisible: isModalOpen && modalName === 'InviteUser',
        modalProps
    }
}

export default connect(mapStateToProps, { hideModal })(InviteUserModalRedux)