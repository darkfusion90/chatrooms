import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <FontAwesomeIcon
        icon={faBell}
        ref={ref}
        className="notification-bell-icon"
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}

    </FontAwesomeIcon>
));


export default (props) => {

    const visibility = props.shouldShowBadge ? "visible" : "hidden";
    return (
        <Dropdown.Toggle as={CustomToggle}>
            <i className={`tiny red circle icon notification-badge ${visibility}`} />
        </Dropdown.Toggle>
    )
}