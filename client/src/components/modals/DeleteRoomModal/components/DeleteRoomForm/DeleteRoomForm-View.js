import React from 'react';
import { Field } from 'redux-form'
import { Form, FormGroup, FormControl } from 'react-bootstrap';

const renderRoomNameField = ({ input, label, ...otherFormProps }) => {
    return (
        <FormGroup controlId="delete-room-form-name">
            <Form.Label><strong>{label}</strong></Form.Label>
            <FormControl {...otherFormProps} {...input} />
        </FormGroup>
    );
}

const DeleteRoomFormView = ({ onFormSubmit, validate }) => {
    return (
        <Form noValidate id='delete-room-form' onSubmit={onFormSubmit} >
            <Field
                component={renderRoomNameField}
                name="roomName"
                label="Room Name:"
                placeholder="Enter Room name here"
                validate={validate}
                required
            />
        </Form>
    );
}

export default DeleteRoomFormView