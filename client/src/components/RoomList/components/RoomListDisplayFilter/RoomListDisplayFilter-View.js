import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { Dropdown } from '../../../standalone'
import RoomListDisplayControlsForm from '../RoomListDisplayControlsForm'
import IconButton, { ICON_POS_LEFT } from '../../../standalone/IconButton';

const RoomListDisplayFilter = ({ onDisplayControlsFormSubmit }) => {
    const hideDropdown = () => {
        //Since rootClose is set to true in OverlayTrigger in Dropdown,
        //clicking anywhere on body dismisses the dropdown
        document.body.click()
    }

    const getFilterButton = () => {
        return (
            <IconButton
                icon={<FontAwesomeIcon icon={faFilter} />}
                iconPos={ICON_POS_LEFT}
                className='no-highlight-around-element'
                variant='secondary'
                size='sm'
            >
                Filter
            </IconButton>
        )
    }

    const getDisplayControlsForm = () => {
        const onFormSubmit = (formValues) => {
            hideDropdown()
            onDisplayControlsFormSubmit(formValues)
        }
        return <RoomListDisplayControlsForm onFormSubmit={onFormSubmit} />
    }

    return (
        <Dropdown
            menu={getDisplayControlsForm()}
            triggerComponent={getFilterButton()}
            show={true}
        />
    )
}

export default RoomListDisplayFilter
