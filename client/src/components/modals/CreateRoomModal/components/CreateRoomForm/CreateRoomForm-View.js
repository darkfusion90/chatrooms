import React from 'react';
import { Field } from 'redux-form'
import { Alert, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { TooltipWrapper } from '../../../../standalone'
import './CreateRoomForm-Style.scss';


const renderRadioOptionHelp = (radioOption) => {
    const createHelp = (tooltipProps) => {
        const helpIcon = <FontAwesomeIcon icon={faQuestionCircle} />
        return <TooltipWrapper triggerComponent={helpIcon} {...tooltipProps} />
    }

    //eslint-disable-next-line
    switch (radioOption) {
        case 'private':
            return createHelp({
                id: 'private-room-opt',
                label: 'Private rooms require permission to join and are not listed publicly'
            })
        case 'unlisted':
            return createHelp({
                id: 'private-room-opt',
                label: 'Unlisted rooms can be joined by anyone but are not listed publicly'
            })
        case 'public':
            return createHelp({
                id: 'private-room-opt',
                label: 'Public rooms are listed publicly and can be joined by anyone'
            })
    }
}

const renderRadioButtonGroup = (formProps) => {
    const { input, meta } = formProps;
    const hasErrors = meta.touched && meta.error;
    const impureFormNoErrors = !meta.pristine && !hasErrors;
    const radioOptions = [
        { label: 'Private', value: 'private' },
        { label: 'Public', value: 'public' },
        { label: 'Unlisted', value: 'unlisted' }
    ]

    const radioInputs = radioOptions.map(option => {
        return (
            <Form.Group controlId={`roomType-${option.value}`} key={option.value}>
                <InputGroup>
                    <Form.Check
                        {...input}
                        {...option}
                        type="radio"
                        isInvalid={hasErrors}
                        isValid={impureFormNoErrors}
                    />
                    <InputGroup.Append>
                        {renderRadioOptionHelp(option.value)}
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        )
    })

    return (
        <Form.Group controlId="create-room-form-type">
            <Form.Label><strong>Select Room Type:</strong></Form.Label>
            {radioInputs}
            {hasErrors && <Alert variant="danger">{meta.error}</Alert>}
        </Form.Group>
    );
}

const renderRoomNameField = (formProps) => {
    const { input, meta } = formProps;
    const hasErrors = meta.touched && meta.error;
    const impureFormNoErrors = !meta.pristine && !hasErrors;

    return (
        <FormGroup controlId="create-room-form-name">
            <Form.Label><strong>{formProps.label}</strong></Form.Label>
            <FormControl {...formProps} {...input} isInvalid={hasErrors} isValid={impureFormNoErrors} />
            <Form.Control.Feedback size="lg" type="invalid">{meta.error}</Form.Control.Feedback>
        </FormGroup>
    );
}

const CreateRoomFormView = (props) => {
    const { onFormSubmit } = props
    return (
        <Form noValidate id="create-room-form" onSubmit={onFormSubmit}>
            <Field
                component={renderRoomNameField}
                name="roomName"
                label="Enter Room Name:"
                placeholder="Example: The Mystical Room"
                required
            />
            <hr />
            <Field component={renderRadioButtonGroup} name='roomType' />
        </Form>
    );
}


export default CreateRoomFormView