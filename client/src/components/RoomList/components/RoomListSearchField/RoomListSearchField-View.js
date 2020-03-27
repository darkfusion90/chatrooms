import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const RoomListSearchFieldView = ({ onSearchFieldInputChange }) => {
    return (
        <InputGroup className='rounded'>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                name='searchQuery'
                placeholder='Search Rooms'
                onChange={onSearchFieldInputChange}
            />
        </InputGroup>
    )
}

export default RoomListSearchFieldView;
