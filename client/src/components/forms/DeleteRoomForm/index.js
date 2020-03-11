import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form, FormGroup, FormControl } from 'react-bootstrap';


class DeleteRoomForm extends React.Component {
    mustMatchRoomName = (value) => {
        const { room } = this.props
        return room && value === room.name ? undefined : 'Room name not equal'
    }

    renderRoomNameField = (formProps) => {
        return (
            <FormGroup controlId="delete-room-form-name">
                <Form.Label><strong>{formProps.label}</strong></Form.Label>
                <FormControl {...formProps} {...formProps.input} />
            </FormGroup>
        );
    }

    render() {
        return (
            <Form noValidate id="delete-room-form" onSubmit={this.props.handleSubmit(this.props.onFormSubmit)} >
                <Field
                    component={this.renderRoomNameField}
                    name="roomName"
                    label="Room Name:"
                    placeholder="Enter Room name here"
                    required
                    validate={this.mustMatchRoomName}
                />
            </Form>
        );
    }
}

export default reduxForm({
    form: 'deleteRoomForm',
})(DeleteRoomForm)