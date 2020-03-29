import React from 'react';
import { Button, Container, Form, FormGroup, FormCheck, FormControl } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

const FORM_ID = 'rooms-sort-form'

const sortOptionsRadioButtonProps = [
    { label: 'By name (ascending)', value: 'name-asc', id: 1 },
    { label: 'By name (descending)', value: 'name-des', id: 2 },
    { label: 'By date of creation (oldest first)', value: 'date-asc', id: 3 },
    { label: 'By date of creation (newest first)', value: 'date-des', id: 4 }
]

class RoomListControlsForm extends React.Component {
    renderRadioButton = ({ input, ...formProps }) => {
        return <FormCheck {...formProps} {...input} />
    }

    renderSortOptions() {
        const sortOptionRadioButtons = sortOptionsRadioButtonProps.map(({ id, ...checkboxProps }) => {
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

        return (
            <FormGroup controlId='sort-options'>
                <Form.Label>Sort By: </Form.Label>
                {sortOptionRadioButtons}
            </FormGroup>
        )
    }

    renderInputRangedNumber = ({ input, label, ...formProps }) => {
        return (
            <>
                <Form.Label>{label}</Form.Label>
                <FormControl {...input} {...formProps} />
            </>
        )
    }

    renderPaginationControls() {
        return (
            <FormGroup controlId='items-per-page'>
                <Field
                    component={this.renderInputRangedNumber}
                    name='itemsPerPage'
                    label='Rooms Displayed Per Page: '
                    type='number'
                    min={1}
                    max={100}
                />
            </FormGroup>
        )
    }

    render() {
        const { handleSubmit, onFormSubmit } = this.props

        return (
            <Form id={FORM_ID} onSubmit={handleSubmit(onFormSubmit)}>
                {this.renderSortOptions()}
                <hr />
                {this.renderPaginationControls()}
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
    initialValues: { sortBy: 'name-asc', itemsPerPage: 10 },
    destroyOnUnmount: false
})(RoomListControlsForm);
