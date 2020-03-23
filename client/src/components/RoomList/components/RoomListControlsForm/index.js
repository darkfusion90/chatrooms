import React from 'react';
import { Button, Container, Form, FormCheck } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

const FORM_ID = 'rooms-sort-form'

class RoomListControlsForm extends React.Component {
    renderRadioButton = ({ input, ...formProps }) => {
        return <FormCheck {...formProps} {...input} />
    }

    renderRadioButtonFields() {
        const radioButtonPropsList = [
            { label: 'By name (ascending)', value: 'name-asc', id: 1 },
            { label: 'By name (descending)', value: 'name-des', id: 2 },
            { label: 'By date of creation (oldest first)', value: 'date-asc', id: 3 },
            { label: 'By date of creation (newest first)', value: 'date-des', id: 4 }
        ]

        return radioButtonPropsList.map(({ id, ...checkboxProps }) => {
            return (
                <Field
                    component={this.renderRadioButton}
                    type='radio'
                    name='sortBy'
                    key={id}
                    checked={id === 1}
                    required
                    {...checkboxProps}
                />
            )
        })
    }

    render() {
        const { handleSubmit, onFormSubmit } = this.props

        return (
            <Form id={FORM_ID} onSubmit={handleSubmit(onFormSubmit)}>
                {this.renderRadioButtonFields()}
                <hr />
                <Container fluid className='text-right'>
                    <Button size='sm' variant='outline-primary' type='submit' form={FORM_ID}>
                        Done
                    </Button>
                </Container>
            </Form>
        )
    }
}

export default reduxForm({
    form: FORM_ID,
    initialValues: {sortBy: 'name-asc'},
    destroyOnUnmount: false
})(RoomListControlsForm);
