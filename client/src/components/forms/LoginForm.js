import React from 'react'
import { Field, reduxForm } from 'redux-form'

const renderField = (formProps) => {
    return (
        <div>
            <label>{formProps.label}</label>
            <input {...formProps.input} type={formProps.type} required />
        </div>
    );
}

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit(props.onFormSubmit)}>
            <div>
                <label htmlFor="username">Username</label>
                <Field name="username" component={renderField} type="text" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component={renderField} type="password" />
            </div>
            <button type="submit">Log In</button>
        </form>
    );
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm)