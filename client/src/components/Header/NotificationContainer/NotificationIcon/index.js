import React from 'react';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
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
        <DropdownToggle as={CustomToggle}>
            <i className={`tiny red circle icon notification-badge ${visibility}`} />
        </DropdownToggle>
    )
}