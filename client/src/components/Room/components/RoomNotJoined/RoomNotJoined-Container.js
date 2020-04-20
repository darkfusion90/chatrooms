import React from 'react'

import RoomNotJoinedView from './RoomNotJoined-View'
import { useProgress } from '../../../hooks'


const RoomNotJoinedContainer = ({
    roomId,
    joinRoom,
    sendRoomJoinRequest,
    isPrivateRoom
}) => {
    const [
        roomActionProgress,
        setRoomActionProgressPending,
        setRoomActionProgressSuccess,
        setRoomActionProgressFailure
    ] = useProgress()

    const onJoinRoomButtonClick = () => {
        setRoomActionProgressPending()

        joinRoom(roomId, setRoomActionProgressSuccess, setRoomActionProgressFailure)
    }

    const onSendJoinRequestButtonClick = () => {
        setRoomActionProgressPending()

        sendRoomJoinRequest(
            roomId,
            setRoomActionProgressSuccess,
            setRoomActionProgressFailure
        )
    }

    return (
        <RoomNotJoinedView
            isPrivateRoom={isPrivateRoom}
            roomActionProgress={roomActionProgress}
            onJoinRoomButtonClick={onJoinRoomButtonClick}
            onSendJoinRequestButtonClick={onSendJoinRequestButtonClick}
        />
    )
}

export default RoomNotJoinedContainer