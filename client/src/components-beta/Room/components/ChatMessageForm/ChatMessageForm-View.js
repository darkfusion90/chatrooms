import React from 'react';
import { Field } from 'redux-form';
import { Container, Button, Form } from 'react-bootstrap';

import { TextInputWordWrap } from '../../../standalone'
import './ChatMessageForm-Style.scss'

const renderMessageField = (formProps) => {
    return (
        <TextInputWordWrap {...formProps} />
    );
}

const ChatMessageFormView = (props) => {
    console.log('render chat message form view: ', props)

    const { onFormSubmit, formId } = props

    return (
        <Form onSubmit={onFormSubmit} id={formId} className='chat-message-form'>
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
                    <Button type='submit' form={formId} variant='outline-primary'>Send</Button>
                </div>
            </Container>
        </Form>
    )
}

export default ChatMessageFormView