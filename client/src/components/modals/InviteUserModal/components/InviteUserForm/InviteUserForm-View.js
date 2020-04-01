import React from 'react';
import { Field } from 'redux-form'
import { Form, FormGroup, FormControl } from 'react-bootstrap';

const renderRoomNameField = ({ input, label, ...otherFormProps }) => {
    return (
        <FormGroup controlId='invite-user-form-username'>
            <Form.Label><strong>{label}</strong></Form.Label>
            <FormControl {...otherFormProps} {...input} />
        </FormGroup>
    );
}

const InviteUserFormView = ({ onFormSubmit }) => {
    return (
        <Form id='invite-user-form' onSubmit={onFormSubmit} >
            <Field
                component={renderRoomNameField}
                name='invitee-username'
                label='Invitee Username:'
                placeholder='Enter username of user to be invited'
                required
            />
        </Form>
    );
}

export default InviteUserFormView