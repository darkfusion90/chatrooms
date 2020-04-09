import React from 'react';
import isEmpty from 'is-empty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from '../../../standalone'
import NotificationList from '../NotificationList'
import { getPendingNotifications } from '../../utils'
import './NotificationIcon-Style.scss'

const NotificationIconView = ({ notifications }) => {
    const pendingNotifications = getPendingNotifications(notifications)

    const getNotificationIcon = () => {
        const getNotificationBadgeContent = () => {
            return pendingNotifications.length < 99 ? pendingNotifications.length : '99+'
        }

        const hasNotifications = pendingNotifications.length > 0
        const badgeVisibility = hasNotifications ? 'visible' : 'hidden'
        const bellActivity = hasNotifications ? 'active' : 'inactive'

        return (
            <div className='notification-icon-container fa-layers fa-fw'>
                <FontAwesomeIcon
                    icon={faBell}
                    size='lg'
                    className={`fas notification-bell-icon ${bellActivity}`}
                />
                <span className={`notification-badge ${badgeVisibility} fa-layers-counter`}>
                    {getNotificationBadgeContent()}
                </span>
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

