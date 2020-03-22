import React from 'react';

import NotificationListItem from '../NotificationListItem';

const NotificationListView= ({ notifications }) => {
    const getNotificationData = () => {
        if (notifications.length === 0) {
            return "You don't have any notifications"
        }

        const notificationIdList = Object.keys(notifications.data)
        return notificationIdList.map(id => {
            const notification = notifications.data[id]
            return <NotificationListItem key={id} notification={notification} />
        })
    }

    return (
        <div>
            {getNotificationData()}
        </div>
    )
}

export default NotificationListView;

