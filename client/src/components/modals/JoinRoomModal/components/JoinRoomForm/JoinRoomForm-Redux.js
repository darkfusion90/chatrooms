import React from 'react';
import { reduxForm } from 'redux-form'

import JoinRoomFormView from './JoinRoomForm-View'
import asyncValidate from './asyncValidate'

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
    asyncValidate,
    asyncChangeFields: ['roomId']
})(JoinRoomFormRedux)