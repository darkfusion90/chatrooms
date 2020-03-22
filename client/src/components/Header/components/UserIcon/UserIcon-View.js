import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from '../../../standalone'

const UserIconView = ({ username, logoutUser }) => {
    const renderMenu = () => {
        return (
            <div className='d-flex flex-column align-items-center'>
                <Button variant="outline-secondary" onClick={logoutUser}>
                    Sign Out
                </Button>
            </div>
        )
    }

    const UserIcon = <FontAwesomeIcon icon={faUser} size="lg" />
    const Title = (
        <span>
            Signed in as <strong>{username}</strong>
        </span>
    )

    return (
        <Dropdown
            title={Title}
            menu={renderMenu()}
            triggerComponent={UserIcon}
        />
    )
}

export default UserIconView