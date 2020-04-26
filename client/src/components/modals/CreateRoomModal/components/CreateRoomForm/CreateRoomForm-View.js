import React from 'react';
import { Field } from 'redux-form'
import { Form, FormGroup, FormControl } from 'react-bootstrap';

import CreateRoomFormRadioInputs from '../CreateRoomFormRadioInputs'
import './CreateRoomForm-Style.scss';


const renderRoomNameField = (formProps) => {
    const { input, meta} = formProps;
    const hasErrors = meta.touched && meta.error;
    const impureFormNoErrors = !meta.pristine && !hasErrors;

    return (
            <FormGroup controlId="create-room-form-name">
                <Form.Label><strong>{formProps.label}</strong></Form.Label>
                <FormControl {...formProps} {...input} isInvalid={hasErrors} isValid={impureFormNoErrors} />
                <Form.Control.Feedback size="lg" type="invalid">{meta.error}</Form.Control.Feedback>
            </FormGroup>
    );
}

const CreateRoomFormView = (props) => {
    const { onFormSubmit} = props
    return (
            <Form noValidate id="create-room-form" onSubmit={onFormSubmit}>
                <Field
                    component={renderRoomNameField}
                    name="roomName"
                    label="Enter Room Name:"
                    placeholder="Example: The Mystical Room"
                    required
                />
                <hr />
                <Field component={CreateRoomFormRadioInputs} name='roomType' />
            </Form>
    );
}


export default CreateRoomFormView