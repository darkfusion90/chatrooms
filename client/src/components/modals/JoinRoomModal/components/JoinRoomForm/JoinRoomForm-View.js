import React from 'react'
import { Field } from 'redux-form'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const renderJoinRoomField = ({ input, label, ...formProps }) => {
    return (
        <FormGroup controlId='join-room'>
            <FormLabel>{label}</FormLabel>
            <FormControl {...input} {...formProps} />
        </FormGroup>
    )
}

const JoinRoomFormView = ({ onFormSubmit }) => {
    return (
        <Form id='join-room-form' onSubmit={onFormSubmit} noValidate>
            <Field
                component={renderJoinRoomField}
                name='join-room'
                label='Enter Room Id'
                placeholder='X-X-X-X'
                required
            />
        </Form>
    );
}

export default JoinRoomFormView