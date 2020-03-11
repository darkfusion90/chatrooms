import React, { useState } from 'react';
import { InputGroup, FormControl, FormLabel } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ToggleablePasswordField = ({ formProps, error }) => {
    const [passwordVisible, setPasswordVisibility] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible)
    }

    const renderDummyFormControlForFeedback = () => {
        return (
            <FormControl
                {...formProps}
                {...formProps.input}
                style={{display: 'none'}}
            />
        )
    }

    return (
        <>
            <FormLabel>{formProps.label}</FormLabel>
            <InputGroup>
                <FormControl
                    {...formProps}
                    {...formProps.input}
                    type={passwordVisible ? 'text' : 'password'}
                />
                <InputGroup.Append onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            {renderDummyFormControlForFeedback()}
            <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        </>
    )
}

export default ToggleablePasswordField;
