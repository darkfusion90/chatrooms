import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'

import { Dropdown } from '../../../standalone'
import RoomListControlsForm from '../RoomListControlsForm'
import IconButton, { ICON_POS_LEFT } from '../../../standalone/IconButton';

const SortRoomDropdownButton = ({ onSortFormSubmit }) => {
    const hideDropdown = () => {
        //Since rootClose is set to true in OverlayTrigger in Dropdown,
        //clicking anywhere on body dismisses the dropdown
        document.body.click()
    }

    const getSortButton = () => {
        return (
            <IconButton
                icon={<FontAwesomeIcon icon={faSort} />}
                iconPos={ICON_POS_LEFT}
                className='no-highlight-around-element'
                variant='secondary'
                size='sm'
            >
                Sort By
            </IconButton>
        )
    }

    const getSortOptions = () => {
        const onFormSubmit = (formValues) => {
            hideDropdown()
            onSortFormSubmit(formValues)
        }
        return <RoomListControlsForm onFormSubmit={onFormSubmit} />
    }

    return (
        <Dropdown
            menu={getSortOptions()}
            triggerComponent={getSortButton()}
            show={true}
        />
    )
}

export default SortRoomDropdownButton
