import React from 'react';
import { ListGroupItem } from 'react-bootstrap'

import RoomInvitationNotificationItem from '../RoomInvitationNotificationItem'
import './NotificationListItem-Style.scss'

const renderNotificationContent = (notification) => {
    const { roomInvitation } = notification
    if (roomInvitation) {
        return <RoomInvitationNotificationItem invitation={roomInvitation} />
    }
}

const NotificationListItemView = ({ notification }) => {
    const readClass = notification.status === 'reviewed' ? 'read' : 'unread'

    return (
        <ListGroupItem className={`m-0 notification-item ${readClass}`}>
            {renderNotificationContent(notification)}
        </ListGroupItem>
    );
}

export default NotificationListItemView;
