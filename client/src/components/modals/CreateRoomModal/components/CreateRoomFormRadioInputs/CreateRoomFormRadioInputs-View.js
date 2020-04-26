import React from 'react'
import { Alert, Form } from 'react-bootstrap'

import { WithHelp } from "../../../../standalone"
import { getHelpOpts } from './help-opts'


const radioOptions = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
    { label: 'Unlisted', value: 'unlisted' }
]

const addHelpToLabel = (label, radioInputValue) => {
    return <WithHelp {...getHelpOpts(radioInputValue)}>{label}</WithHelp>
}

const renderRadioInputs = (input, hasErrors, impureFormNoErrors) => {
    return radioOptions.map(({ label, value }) => {
        return (
            <Form.Group controlId={`roomType-${value}`} key={value}>
                <Form.Check
                    {...input}
                    value={value}
                    label={addHelpToLabel(label, value)}
                    type='radio'
                    isInvalid={hasErrors}
                    isValid={impureFormNoErrors}
                />
            </Form.Group>
        )
    })
}

const CreateRoomFormRadioInputsView = (props) => {
    const { input, meta } = props;
    const hasErrors = meta.touched && meta.error;
    const impureFormNoErrors = !meta.pristine && !hasErrors;

    return (
        <Form.Group controlId="create-room-form-type">
            <Form.Label><strong>Select Room Type:</strong></Form.Label>
            {renderRadioInputs(input, hasErrors, impureFormNoErrors)}
            {hasErrors && <Alert variant="danger">{meta.error}</Alert>}
        </Form.Group>
    )
}


export default CreateRoomFormRadioInputsView
