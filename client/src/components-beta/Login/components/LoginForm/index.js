import React from 'react'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

import { ToggleablePasswordField } from '../../../standalone'
import validate from './validate'

const getFormControlProps = (formProps) => {
    const { touched, error, pristine } = formProps.meta
    const hasErrors = touched && error

    return {
        ...formProps,
        ...formProps.input,
        isInvalid: hasErrors,
        isValid: !pristine && !hasErrors
    }
}

const renderField = (formProps) => {
    const { error } = formProps.meta
    const formControlProps = getFormControlProps(formProps)

    if (formProps.type === 'password') {
        return <ToggleablePasswordField formProps={formControlProps} error={error} />
    }

    return (
        <>
            <Form.Label>{formProps.label}</Form.Label>
            <FormControl {...formControlProps} />
            <FormControl.Feedback type='invalid'>{error}</FormControl.Feedback>
        </>
    );
}

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
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

            <Button type="submit">Login</Button>
        </Form>
    );
}

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm)