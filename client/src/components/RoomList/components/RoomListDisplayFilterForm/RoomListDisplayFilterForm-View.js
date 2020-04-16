import React from 'react';
import { Button, Container, Form, FormGroup, FormCheck, FormControl } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

const FORM_ID = 'rooms-sort-form'

const sortOptionsRadioButtonProps = [
    { label: 'By name (ascending)', value: 'name-asc', id: 'sort-by-name-asc' },
    { label: 'By name (descending)', value: 'name-des', id: 'sort-by-name-des' },
    { label: 'By date of creation (oldest first)', value: 'date-asc', id: 'sort-by-date-asc' },
    { label: 'By date of creation (newest first)', value: 'date-des', id: 'sort-by-date-des' }
]

const filterOptionsRadioButtonProps = [
    { label: 'All Rooms', value: 'no-filter', id: 'filter-none' },
    { label: 'Joined Rooms', value: 'is-member', id: 'filter-member' },
    { label: 'Rooms Not Joined', value: 'is-not-Member', id: 'filter-not-member' },
    { label: 'Rooms Created By Me', value: 'user-created', id: 'filter-user-created' },
    { label: 'Rooms Not Created By Me', value: 'user-not-created', id: 'filter-user-not-created' }
]


class RoomListControlsForm extends React.Component {
    renderRadioButton = ({ input, ...formProps }) => {
        return <FormCheck {...formProps} {...input} />
    }

    renderSortOptions() {
        const sortOptionRadioButtons = sortOptionsRadioButtonProps.map(({ id, ...radioButtonProps }) => {
            return (
                <Field
                    component={this.renderRadioButton}
                    type='radio'
                    name='sortBy'
                    key={id}
                    required
                    {...radioButtonProps}
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
                    max={this.props.maxItemsPerPage || 100}
                />
            </FormGroup>
        )
    }

    renderDisplayFilters() {
        const renderDisplayFilterRadioButtons = () => {
            return filterOptionsRadioButtonProps.map(({ id, ...radioButtonProps }) => {
                return (
                    <Field
                        component={this.renderRadioButton}
                        type='radio'
                        name='displayFilter'
                        key={id}
                        {...radioButtonProps}
                    />
                )
            })
        }

        return (
            <FormGroup controlId='display-filter' >
                <Form.Label>Filter Rooms: </Form.Label>
                {renderDisplayFilterRadioButtons()}
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
                <hr />
                {this.renderDisplayFilters()}
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
    initialValues: { sortBy: 'name-asc', itemsPerPage: 10, displayFilter: 'no-filter' },
    destroyOnUnmount: false
})(RoomListControlsForm);
