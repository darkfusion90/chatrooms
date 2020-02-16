import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faGlobe, faPaperclip } from '@fortawesome/free-solid-svg-icons';

import './CreateRoomForm.scss';

const mapRoomTypeToIcon = {
    'Private': faLock,
    'Public': faGlobe,
    'Unlisted': faPaperclip
}

const renderRadioLabel = (roomType) => {
    return (
        <div class="radio-label-container">
            <FontAwesomeIcon icon={mapRoomTypeToIcon[roomType]} size="xs" />
            <Form.Label>{roomType}</Form.Label>
        </div>
    )
}

const renderRadios = () => {
    return ['Private', 'Unlisted', 'Public'].map(roomType => {
        return (
            <div key={roomType}>
                <Field
                    component='input'
                    name="create-room-type"
                    type="radio"
                    label={roomType}
                    key={roomType}
                    value={roomType}
                />
                {renderRadioLabel(roomType)}
            </div>
        )
    })
}

const renderRoomNameField = (formProps) => {
    return (
        <>
            <Form.Label><strong>Enter Room Name</strong></Form.Label>
            <FormControl {...formProps.input} placeholder="Example: room_for_dolphins" required />
        </>
    );
}

const renderRoomTypeField = () => {
    return (
        <>
            <Form.Label><strong>Select Room Type</strong></Form.Label>
            {renderRadios()}
        </>
    )
}

const CreateRoomForm = (props) => {
    //Submit button resides in CreateRoomModal's Footer for better UI
    return (
        <Form id="create-room-form" onSubmit={props.handleSubmit((formProps) => console.log("Form Submitted: ", formProps))}>
            <FormGroup controlId="create-room-form-name">
                <Field
                    component={renderRoomNameField}
                    name="create-room-name"
                />
            </FormGroup>
            <hr />
            <FormGroup controlId="create-room-form-type">
                {renderRoomTypeField()}
            </FormGroup>
        </Form>
    );
}


export default reduxForm({
    form: 'createRoomForm'
})(CreateRoomForm)