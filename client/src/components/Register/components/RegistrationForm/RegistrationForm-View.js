import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { USERNAME_TAKEN_ERROR_MESSAGE } from './asyncValidate';
import { ToggleablePasswordField } from '../../../standalone'
import './RegistrationForm-Style.scss'


const isAsyncValidationError = (error) => {
    return error === USERNAME_TAKEN_ERROR_MESSAGE
}

const getPropsForFormControl = (formProps) => {
    const { touched, error, pristine, asyncValidating } = formProps.meta
    const hasErrors = isAsyncValidationError(error) || (touched && error)

    return {
        ...formProps,
        ...formProps.input,
        className: asyncValidating ? 'loading' : '',
        isInvalid: hasErrors,
        isValid: !asyncValidating && !pristine && !hasErrors
    }
}

const renderField = (formProps) => {
    const { error } = formProps.meta
    const formControlProps = getPropsForFormControl(formProps)

    if (formProps.type === 'password') {
        return <ToggleablePasswordField formProps={formControlProps} error={error} />
    }

    return (
        <>
            <Form.Label>{formProps.label}</Form.Label>
            <FormControl {...formControlProps} />
            <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        </>
    );
}

const RegistrationForm = ({ onFormSubmit, isRegisterButtonDisabled }) => {
    const registerButtonCursorStyle = isRegisterButtonDisabled ? 'not-allowed' : 'cursor'

    return (
        <Form noValidate id="registration-form" onSubmit={onFormSubmit}>
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
                className={`cursor-${registerButtonCursorStyle}`}
                disabled={isRegisterButtonDisabled}
            >
                Register
            </Button>
        </Form>
    );
}

export default RegistrationForm