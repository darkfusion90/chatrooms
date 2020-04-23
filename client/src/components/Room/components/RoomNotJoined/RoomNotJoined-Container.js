import React from 'react'

import RoomNotJoinedView from './RoomNotJoined-View'
import { useProgress } from '../../../hooks'
import { roomJoinRequests } from '../../../../api/http'


const RoomNotJoinedContainer = ({
    roomId,
    joinRoom,
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

        roomJoinRequests.sendJoinRequest(
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