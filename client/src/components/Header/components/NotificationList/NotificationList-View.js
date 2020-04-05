import React from 'react';
import { ListGroup } from 'react-bootstrap'

import NotificationListItem from '../NotificationListItem';
import './NotificationList-Style.scss'

const NotificationListView = ({ notifications }) => {
    const getNotificationData = () => {
        if (notifications.length === 0) {
            return "You don't have any notifications"
        }

        return notifications.map(notification => {
            return <NotificationListItem key={notification._id} notification={notification} />
        })
    }

    return (
        <ListGroup variant='flush' className='notification-list'>
            {getNotificationData()}
        </ListGroup>
    )
}

export default NotificationListView;

