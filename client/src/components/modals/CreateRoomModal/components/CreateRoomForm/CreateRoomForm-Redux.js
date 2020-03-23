import React from 'react';
import { reduxForm } from 'redux-form'

import CreateRoomFormView from './CreateRoomForm-View'
import validate from './validate';

const CreateRoomForm = (props) => {
    const { handleSubmit, onFormSubmit } = props

    return (
        <CreateRoomFormView
            onFormSubmit={handleSubmit(onFormSubmit)}
        />
    )
}


export default reduxForm({
    form: 'createRoomForm',
    validate: validate
})(CreateRoomForm)