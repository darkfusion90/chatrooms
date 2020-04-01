import React from 'react';
import { reduxForm } from 'redux-form'

import InviteUserFormView from './InviteUserForm-View'

const InviteUserFormRedux = ({ onFormSubmit, handleSubmit }) => {
    return <InviteUserFormView onFormSubmit={handleSubmit(onFormSubmit)} />
}

export default reduxForm({
    form: 'invite-user-form'
})(InviteUserFormRedux)
