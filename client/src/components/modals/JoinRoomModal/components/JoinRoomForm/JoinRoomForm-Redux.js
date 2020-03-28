import React from 'react';
import { reduxForm } from 'redux-form'

import JoinRoomFormView from './JoinRoomForm-View'
import asyncValidate from './asyncValidate'

const JoinRoomFormRedux = ({ handleSubmit, onFormSubmit, roomAlreadyJoinedError }) => {
    return (
        <JoinRoomFormView
            onFormSubmit={handleSubmit(onFormSubmit)}
            roomAlreadyJoinedError={roomAlreadyJoinedError}
        />
    )
}

export default reduxForm({
    form: 'joinRoomForm',
    asyncValidate,
    asyncChangeFields: ['roomId']
})(JoinRoomFormRedux)