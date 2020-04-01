import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from '../../../standalone'
import NotificationList from '../NotificationList'
import './NotificationIcon-Style.scss'

const NotificationIconView = ({ notifications }) => {
    const getNotificationIcon = () => {
        const hasNotifications = notifications.length > 0
        const badgeVisibility = hasNotifications ? 'visible' : 'hidden'
        const bellActivity = hasNotifications ? 'active' : 'inactive'

        return (
            <div className='notification-icon-container'>
                <FontAwesomeIcon
                    icon={faBell}
                    size='lg'
                    className={`notification-bell-icon ${bellActivity}`}
                />
                <FontAwesomeIcon
                    icon={faCircle}
                    size='xs'
                    color='red'
                    className={`notification-badge ${badgeVisibility}`}
                />
            </div>
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

