import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import validate from './validate';

const renderFieldFeedback = ({ touched, error }) => {
    if (touched && error) {
        return <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
    }
    return null;
}

const renderField = ({input, type, placeholder, meta: {touched, visited, error}}) => {
    console.log("FORM PROPS FOR: ", formProps.input.name, ": ", formProps)
    console.log("IS VALID: ", !formProps.meta.visited ? undefined : formProps.meta.error)
    return (
        <FormGroup controlId={formProps.controlId}>
            <Form.Label>{formProps.label}</Form.Label>
            <FormControl
                {...formProps.input}
                type={formProps.type}
                placeholder={formProps.placeholder}
                required
                isValid={!formProps.touched ? undefined : formProps.error}
            />
            {renderFieldFeedback(formProps.meta)}
        </FormGroup>
    );
}

const RegisterForm = (props) => {
    return (
        <Form noValidate onSubmit={props.handleSubmit(props.onFormSubmit)}>
            <Field
                component={renderField}
                name="username"
                type="text"
                label="Enter Username"
                placeholder="Example: mitsy_the_cat"
                controlId="formUsernameGroup"
            />

            <Field
                component={renderField}
                name="password"
                type="password"
                label="Enter Password"
                placeholder="Password"
                controlId="formPasswordGroup"
            />

            <Field
                component={renderField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                controlId="formConfirmPasswordGroup"
            />

            <Button type="submit">Register</Button>
        </Form>
    );
}

export default reduxForm({
    form: 'registerForm',
    validate: validate
})(RegisterForm)