import React from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import { Container, Button, Form } from 'react-bootstrap';

import TextInputWordWrap from '../../TextInputWordWrap'
import './style.scss'

const FORM_ID = 'chat-message-form'

const renderMessageField = (formProps) => {
    return (
        <TextInputWordWrap {...formProps} />
    );
}

const ChatMessageForm = (props) => {
    const { handleSubmit, onFormSubmit } = props

    return (
        <Form onSubmit={handleSubmit(onFormSubmit)} id={FORM_ID} className='chat-message-form'>
            <Container className='d-flex align-items-center' fluid>
                <div className='textarea-flex-container'>
                    <Form.Group controlId='message' className='textarea-wrapper'>
                        <Field
                            name='message'
                            placeholder='Type a message...'
                            type='text'
                            component={renderMessageField}
                        />
                    </Form.Group>
                </div>
                <div className='send-btn-flex-container'>
                    <Button type='submit' form={FORM_ID} variant='outline-primary'>Send</Button>
                </div>
            </Container>
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