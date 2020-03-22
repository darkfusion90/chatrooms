import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faIdBadge } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from '../../../standalone'
import NotificationList from '../NotificationList'
import './NotificationIcon-Style.scss'

const NotificationIconView = ({ notifications }) => {
    const getNotificationIcon = () => {
        const badgeVisibility = notifications.length > 0 ? 'visible' : 'hidden'
        return (
            <FontAwesomeIcon icon={faBell} size="lg">
                <FontAwesomeIcon
                    icon={faIdBadge}
                    className={`notification-badge ${badgeVisibility}`}
                />
            </FontAwesomeIcon>
        );
    }

    return (
        <Dropdown
            title="Notifications"
            menu={<NotificationList notifications={notifications} />}
            triggerComponent={getNotificationIcon()}
        />
    )
}

export default NotificationIconView;

