import React from 'react';

import { useProgress } from '../../../hooks'
import RoomListItemActionsView from './RoomListItemActions-View'

const RoomListItemActionsContainer = ({ joinRoom, ...props }) => {
    const [
        joinRoomProgress,
        setJoinRoomProgressPending,
        setJoinRoomProgressSuccess,
        setJoinRoomProgressFailure
    ] = useProgress()

    const onJoinRoomButtonClick = (roomId) => {
        setJoinRoomProgressPending()
        joinRoom(roomId, setJoinRoomProgressSuccess, setJoinRoomProgressFailure)
    }

    return (
        <RoomListItemActionsView
            joinRoomProgress={joinRoomProgress}
            onJoinRoomButtonClick={onJoinRoomButtonClick}
            {...props}
        />
    )
}

export default RoomListItemActionsContainer;
