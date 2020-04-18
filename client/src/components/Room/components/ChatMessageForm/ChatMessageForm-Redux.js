import React from 'react';
import { reduxForm, reset } from 'redux-form';

import ChatMessageFormView from './ChatMessageForm-View'

const FORM_ID = 'chat-message-form'

const ChatMessageFormRedux = (props) => {
    const { handleSubmit, onFormSubmit, onTextInputKeyDown } = props
    return (
        <ChatMessageFormView
            onFormSubmit={handleSubmit(onFormSubmit)}
            formId={FORM_ID}
            onTextInputKeyDown={onTextInputKeyDown}
        />
    )
}

const resetForm = (_/*result*/, dispatch) => {
    dispatch(reset(FORM_ID))
}

export default reduxForm({
    form: FORM_ID,
    onSubmitSuccess: resetForm
})(ChatMessageFormRedux);