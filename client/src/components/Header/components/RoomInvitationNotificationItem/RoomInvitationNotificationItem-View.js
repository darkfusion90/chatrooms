import React from 'react';

const getContent = (invitation) => {
    const { inviter, room } = invitation
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

const RoomInvitationNotificationItem = ({ invitation }) => {
    return (
        <>
            <h6 className='mb-1 mt-0'>Room Invitation</h6>
            {getContent(invitation)}
        </>
    )
}

export default RoomInvitationNotificationItem;
