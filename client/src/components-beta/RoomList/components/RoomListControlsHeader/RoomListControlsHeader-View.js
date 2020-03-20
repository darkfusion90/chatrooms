import React from 'react';
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'

import { Dropdown } from '../../../standalone'
import RoomListControlsForm from '../RoomListControlsForm'

class RoomListControlsHeader extends React.Component {
    hideDropdown = () => {
        //Since rootClose is set to true in OverlayTrigger in Dropdown,
        //clicking anywhere on body dismisses the dropdown
        document.body.click()
    }

    getTriggerComponent() {
        return (
            <div className='d-inline cursor-pointer'>
                <FontAwesomeIcon icon={faSort} />
                <span style={{ marginLeft: '0.5vw' }}>Sort By</span>
            </div>
        )
    }

    getDropdownMenu() {
        const onFormSubmit = (formValues) => {
            document.body.click()
            this.props.onSortFormSubmit(formValues)
        }
        return <RoomListControlsForm onFormSubmit={onFormSubmit} />
    }

    render() {
        const dropdownProps = {
            triggerComponent: this.getTriggerComponent(),
            menu: this.getDropdownMenu(),
            show: this.props.showDropdown
        }

        return (
            <Container fluid className='room-page-sub-header'>
                <Dropdown {...dropdownProps} />
            </Container>
        )
    }
}

export default RoomListControlsHeader;
