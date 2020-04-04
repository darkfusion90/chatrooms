import React from 'react'
import { connect } from 'react-redux'

import InviteUserModalContainer from './InviteUserModal-Container'
import { hideModal } from '../../../redux/actions/modal-actions';
import { selectUsername } from './utils'

const InviteUserModalRedux = (props) => {
    return <InviteUserModalContainer {...props} />
}

const mapStateToProps = (state) => {
    const { modal: { isModalOpen, modalName, modalProps }, form } = state
    return {
        isModalVisible: isModalOpen && modalName === 'InviteUser',
        modalProps,
        inviteUserForm: form['invite-user-form'],
    }
}

export default connect(mapStateToProps, { hideModal, selectUsername })(InviteUserModalRedux)