import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import validate from './validate';
import { checkUsernameExists, USERNAME_TAKEN_ERROR_MESSAGE } from './asyncValidate';
import './style.scss';


const renderField = (formProps) => {
    const { touched, error, pristine, asyncValidating } = formProps.meta
    const hasErrors = isAsyncValidationError(error) || (touched && error)

    return (
        <>
            <Form.Label>{formProps.label}</Form.Label>
            <FormControl
                className={asyncValidating ? 'loading' : ''}
                {...formProps.input}
                {...formProps}
                isInvalid={hasErrors}
                isValid={!asyncValidating && !pristine && !hasErrors}
            />
            <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        </>
    );
}

const isAsyncValidationError = (error) => {
    return error === USERNAME_TAKEN_ERROR_MESSAGE
}

const RegisterForm = (props) => {
    const { pristine, submitting, asyncValidating, invalid } = props;
    const registerButtonDisabled = (pristine || submitting || asyncValidating || invalid);

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
    validate: validate,
    asyncValidate: checkUsernameExists,
    asyncChangeFields: ['username']
})(RegisterForm)