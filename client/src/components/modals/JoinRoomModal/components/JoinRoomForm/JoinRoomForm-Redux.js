import React from 'react';
import { reduxForm } from 'redux-form'

import JoinRoomFormView from './JoinRoomForm-View'

const JoinRoomFormRedux = (props) => {
    const { handleSubmit, onFormSubmit } = props

    return (
        <JoinRoomFormView
            onFormSubmit={handleSubmit(onFormSubmit)}
        />
    )
}


export default reduxForm({
    form: 'joinRoomForm',
})(JoinRoomFormRedux)