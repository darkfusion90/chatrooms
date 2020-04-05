import React from 'react';
import isEmpty from 'is-empty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from '../../../standalone'
import NotificationList from '../NotificationList'
import { getPendingNotifications } from '../../utils'
import './NotificationIcon-Style.scss'

const NotificationIconView = ({ notifications }) => {
    console.log('all notifs: ', notifications)
    const pendingNotifications = getPendingNotifications(notifications)
    console.log('pending notifs: ', pendingNotifications)
    const getNotificationIcon = () => {
        const hasNotifications = pendingNotifications.length > 0
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

    const getTitle = () => {
        return (
            <p className='m-0'>
                Notifications
                {isEmpty(pendingNotifications) ? '' : ` (${pendingNotifications.length})`}
            </p>
        )
    }

    return (
        <Dropdown
            title={getTitle()}
            menu={<NotificationList notifications={pendingNotifications} />}
            triggerComponent={getNotificationIcon()}
        />
    )
}

export default NotificationIconView;

