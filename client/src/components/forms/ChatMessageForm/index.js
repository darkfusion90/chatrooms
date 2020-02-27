import React from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import {Button, Form, Row, Col } from 'react-bootstrap';

const FORM_ID = 'chat-message-form'

const renderMessageField = (formProps) => {
    return <Form.Control {...formProps} {...formProps.input} />;
}

const ChatMessageForm = (props) => {
    const onFormSubmit = props.handleSubmit(props.onFormSubmit)
    return (
        <Form onSubmit={onFormSubmit} id={FORM_ID}>
            <Row>
                <Col sm={10}>
                    <Form.Group controlId='message'>
                        <Field
                            name='message'
                            placeholder='Type a message...'
                            type='text'
                            as='textarea'
                            component={renderMessageField}
                        />
                    </Form.Group>
                </Col>
                <Col sm={2} >
                    <Button type='submit' form={FORM_ID} size='lg'>Send</Button>
                </Col>
            </Row>
        </Form>
    )
}

const resetForm = (_/*result*/, dispatch) => {
    dispatch(reset(FORM_ID))
}

export default reduxForm({
    form: FORM_ID,
    onSubmitSuccess: resetForm
})(ChatMessageForm);