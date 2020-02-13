import React from 'react'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

const renderField = (formProps) => {
    return (
        <>
            <Form.Label>{formProps.label}</Form.Label>
            <FormControl
                {...formProps.input}
                type={formProps.type}
                placeholder={formProps.placeholder}
                required />
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
    form: 'loginForm'
})(LoginForm)