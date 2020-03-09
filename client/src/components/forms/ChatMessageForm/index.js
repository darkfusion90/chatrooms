import React from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import { Button, Form, Row, Col } from 'react-bootstrap';

import TextInputWordWrap from '../../TextInputWordWrap'
import './style.scss'

const FORM_ID = 'chat-message-form'

const renderMessageField = (formProps) => {
    return (
        <TextInputWordWrap {...formProps} />
    );
}

const ChatMessageForm = (props) => {
    const onFormSubmit = props.handleSubmit(props.onFormSubmit)
    return (
        <Form onSubmit={onFormSubmit} id={FORM_ID}>
            <Row className='d-flex align-items-center'>
                <Col sm={10}>
                    <Form.Group controlId='message' className='w-100 textarea-container'>
                        <Field
                            name='message'
                            placeholder='Type a message...'
                            type='text'
                            component={renderMessageField}
                        />
                    </Form.Group>
                </Col>
                <Col sm={2} className='text-left'>
                    <Button type='submit' form={FORM_ID}>Send</Button>
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