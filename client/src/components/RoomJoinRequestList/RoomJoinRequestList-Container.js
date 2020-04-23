import React, { useEffect, useState } from 'react';

import { roomJoinRequests } from '../../api/http'
import { sortRequestList } from './utils'
import RoomJoinRequestListView from './RoomJoinRequestList-View'


const RoomJoinRequestListContainer = ({ currentUserId, setDocumentTitle, ...props }) => {
    const [joinRequestList, setJoinRequestList] = useState([])

    useEffect(() => {
        if (currentUserId) {
            roomJoinRequests.getAllJoinRequestByCurrentUser()
                .then(response => setJoinRequestList(response.data))
                .catch(_ => setJoinRequestList([]))
        }
    }, [currentUserId])

    useEffect(() => {
        setDocumentTitle('ChatRooms - Room Join Requests')
    }, [setDocumentTitle])


    return (
        <RoomJoinRequestListView
            joinRequestList={joinRequestList.sort(sortRequestList)}
            {...props}
        />
    )
}

export default RoomJoinRequestListContainer
