import React from 'react'
import isEmpty from 'is-empty'
import { Field } from 'redux-form'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

//TODO: See this and implement -> https://github.com/redux-form/redux-form/issues/3944
const renderJoinRoomField = ({ input, label, meta, roomAlreadyJoinedError, ...formProps }) => {
    const { touched, error, pristine, asyncValidating } = meta
    const formErrors = (error && error.isAsyncValidationError) || (touched && error)
    const hasErrors = formErrors || roomAlreadyJoinedError
    const errorReason = roomAlreadyJoinedError || (error && (error.isAsyncValidationError ? error.reason : error))

    return (
        <FormGroup controlId='join-room'>
            <FormLabel>{label}</FormLabel>
            <FormControl
                className={asyncValidating ? 'input-loading' : ''}
                isValid={(!asyncValidating && !pristine && !hasErrors)}
                isInvalid={hasErrors}
                {...input}
                {...formProps}
            />
            <FormControl.Feedback type='invalid'>{errorReason}</FormControl.Feedback>
        </FormGroup>
    )
}

const ensureNotEmpty = (roomId) => isEmpty(roomId) ? 'RoomId is required' : undefined

const JoinRoomFormView = ({ onFormSubmit, roomAlreadyJoinedError }) => {
    return (
        <Form id='join-room-form' onSubmit={onFormSubmit} >
            <Field
                component={renderJoinRoomField}
                name='roomId'
                label='Enter Room Id'
                placeholder='X-X-X-X'
                roomAlreadyJoinedError={roomAlreadyJoinedError}
                validate={ensureNotEmpty}
            />
        </Form>
    );
}

export default JoinRoomFormView