import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faIdBadge } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
    const visibility = props.shouldShowBadge ? "visible" : "hidden";
    return (
        <FontAwesomeIcon icon={faBell} size="lg">
            <FontAwesomeIcon icon={faIdBadge} style={{ visibility: visibility }} />
        </FontAwesomeIcon>
    );
}