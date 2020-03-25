import React from 'react'
import isEmpty from 'is-empty'
import { Field } from 'redux-form'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const renderJoinRoomField = ({ input, label, meta, ...formProps }) => {
    const { touched, error, pristine } = meta
    const hasErrors = touched && error

    return (
        <FormGroup controlId='join-room'>
            <FormLabel>{label}</FormLabel>
            <FormControl
                isValid={(!pristine && !hasErrors)}
                isInvalid={hasErrors}
                {...input}
                {...formProps}
            />
            <FormControl.Feedback type='invalid'>{error}</FormControl.Feedback>
        </FormGroup>
    )
}

const ensureNotEmpty = value => {
    return isEmpty(value) ? 'Room Id is required' : undefined
}

const JoinRoomFormView = ({ onFormSubmit }) => {
    return (
        <Form id='join-room-form' onSubmit={onFormSubmit} >
            <Field
                component={renderJoinRoomField}
                name='roomId'
                label='Enter Room Id'
                placeholder='X-X-X-X'
                validate={ensureNotEmpty}
            />
        </Form>
    );
}

export default JoinRoomFormView