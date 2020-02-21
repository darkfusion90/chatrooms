import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form, FormGroup, FormControl, Alert } from 'react-bootstrap';

import validate from './validate';

import './CreateRoomForm.scss';


const radioOptions = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
    { label: 'Unlisted', value: 'unlisted' }
]


const renderRadioGroup = (formProps) => {
    console.log("FormProps for radios: ", formProps)
    const { input, meta, options } = formProps;
    const hasErrors = meta.touched && meta.error;
    const impureFormNoErrors = !meta.pristine && !hasErrors;

    const radioInputs = options.map(option => {
        return (
            <Form.Group controlId={`roomType-${option.value}`}>
                <Form.Check
                    {...input}
                    {...option}
                    type="radio"
                    isInvalid={hasErrors}
                    isValid={impureFormNoErrors}
                />
            </Form.Group>
        )
    })

    return (
        <Form.Group controlId="create-room-form-type">
            <Form.Label><strong>Select Room Type:</strong></Form.Label>
            {radioInputs}
            {hasErrors && <Alert variant="danger">{meta.error}</Alert>}
        </Form.Group>
    );
}


const renderRoomNameField = (formProps) => {
    const { input, meta } = formProps;
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


const CreateRoomForm = (props) => {
    //Submit button resides in CreateRoomModal's Footer for better UI
    return (
        <Form noValidate id="create-room-form" onSubmit={props.handleSubmit(props.onFormSubmit)}>
            <Field
                component={renderRoomNameField}
                name="roomName"
                label="Enter Room Name:"
                placeholder="Example: room_for_dolphins"
                required
            />
            <hr />
            <Field component={renderRadioGroup} options={radioOptions} name='roomType' />
        </Form >
    );
}


export default reduxForm({
    form: 'createRoomForm',
    validate: validate
})(CreateRoomForm)