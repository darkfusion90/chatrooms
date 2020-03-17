import React from 'react';
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'

import Dropdown from '../../../components/Dropdown'
import RoomListControlsForm from '../../../components/forms/RoomListControlsForm'
import './style.scss'

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
                <span className='icon-label'>Sort By</span>
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
            <Container fluid>
                <Dropdown {...dropdownProps} />
            </Container>
        )
    }
}

export default RoomListControlsHeader;
