import React from 'react';
import { ListGroupItem } from 'react-bootstrap'

import './NotificationListItem-Style.scss'
import { getNotificationTitle } from './utils'

const renderNotificationContent = (notification) => {
    const { roomInvitation } = notification
    if (roomInvitation) {
        const { inviter, room } = roomInvitation
        const inviterUsername = inviter && inviter.username
        const roomName = room && room.name

        return (
            <p className='mb-0'>
                <em>{inviterUsername}</em>{' '}
                invited you to join the room{' '}
                <em>{roomName}</em>
            </p>
        )
    }
}

const NotificationListItemView = ({ notification }) => {
    const title = getNotificationTitle(notification)
    const readClass = notification.status === 'reviewed' ? 'read' : 'unread'

    return (
        <ListGroupItem className={`my-1 notification-item ${readClass}`}>
            <h6 className='mb-1 mt-0'>{title}</h6>
            {renderNotificationContent(notification)}
        </ListGroupItem>
    );
}

export default NotificationListItemView;
