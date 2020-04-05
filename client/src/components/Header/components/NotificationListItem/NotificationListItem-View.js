import React from 'react';
import { ListGroupItem } from 'react-bootstrap'

import RoomInvitationNotificationItem from '../RoomInvitationNotificationItem'
import './NotificationListItem-Style.scss'

const renderNotificationContent = (notification) => {
    const { roomInvitation, _id } = notification
    if (roomInvitation) {
        return <RoomInvitationNotificationItem invitation={roomInvitation} notificationId={_id} />
    }
}

const NotificationListItemView = ({ notification }) => {
    return (
        <ListGroupItem className='m-0 notification-item'>
            {renderNotificationContent(notification)}
        </ListGroupItem>
    );
}

export default NotificationListItemView;
