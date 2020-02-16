import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import validate from './validate';

const renderField = (formProps) => {
    const { touched, error, pristine } = formProps.meta
    return (
        <>
            <Form.Label>{formProps.label}</Form.Label>
            <FormControl
                {...formProps.input}
                {...formProps}
                isInvalid={touched && error}
                isValid={!pristine && !(touched && error)}
            />
            <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        </>
    );
}

const RegisterForm = (props) => {
    const { pristine, submitting, invalid } = props;
    const registerButtonDisabled = (pristine || submitting || invalid);

    const registerButtonStyle = {
        cursor: registerButtonDisabled ? "not-allowed" : "pointer"
    }

    return (
        <Form id="registration-form" noValidate onSubmit={props.handleSubmit(props.onFormSubmit)}>
            <FormGroup controlId="formUsernameGroup">
                <Field
                    component={renderField}
                    name="username"
                    type="text"
                    label="Enter Username"
                    placeholder="Example: mitsy_the_cat"
                />
            </FormGroup>
            <FormGroup controlId="formPasswordGroup">
                <Field
                    component={renderField}
                    name="password"
                    type="password"
                    label="Enter Password"
                    placeholder="Password"
                />
            </FormGroup>

            <FormGroup controlId="formConfirmPasswordGroup">
                <Field
                    component={renderField}
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                />
            </FormGroup>

            <Button
                type="submit"
                form="registration-form"
                disabled={registerButtonDisabled}
                style={registerButtonStyle}
            >
                Register
            </Button>
        </Form >
    );
}

export default reduxForm({
    form: 'registerForm',
    validate: validate
})(RegisterForm)