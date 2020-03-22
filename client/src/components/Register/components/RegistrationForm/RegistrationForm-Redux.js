import React from 'react';
import { reduxForm } from 'redux-form';

import RegistrationFormView from './RegistrationForm-View'
import validate from './validate';
import { checkUsernameExists } from './asyncValidate';

const RegistrationFormRedux = ({ handleSubmit, onFormSubmit, ...otherProps }) => {
    const { pristine, submitting, asyncValidating, invalid } = otherProps;
    const isRegisterButtonDisabled = (pristine || submitting || asyncValidating || invalid);

    return (
        <RegistrationFormView
            isRegisterButtonDisabled={isRegisterButtonDisabled}
            onFormSubmit={handleSubmit(onFormSubmit)}
        />
    )
}

export default reduxForm({
    form: 'registerForm',
    validate: validate,
    asyncValidate: checkUsernameExists,
    asyncChangeFields: ['username']
})(RegistrationFormRedux)