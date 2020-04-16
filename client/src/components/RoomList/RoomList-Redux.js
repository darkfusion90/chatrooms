import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'

import RoomListView from './RoomList-View'
import {
    fetchPublicRooms,
    updateTotalPublicRoomsCount
} from '../../redux/actions/room-actions'


const RoomListRedux = ({
    updateTotalPublicRoomsCount,
    fetchPublicRooms,
    rooms,
    roomListDisplaySettings,
    ...props }) => {

    useEffect(() => {
        updateTotalPublicRoomsCount()
        fetchPublicRooms()
    }, [roomListDisplaySettings, fetchPublicRooms, updateTotalPublicRoomsCount])

    const getSearchQuery = () => {
        const { searchQuery } = roomListDisplaySettings
        return searchQuery && searchQuery.toLowerCase().trim()
    }

    const isSearchQueryEmpty = _.isEmpty(getSearchQuery())

    return <RoomListView rooms={rooms} isSearchResult={!isSearchQueryEmpty} />
}

const mapStateToProps = (state) => {
    const { rooms: { currentRooms }, roomListDisplaySettings } = state

    return {
        rooms: Object.values(currentRooms),
        roomListDisplaySettings
    }
}

const mapDispatchToProps = ({
    fetchPublicRooms,
    updateTotalPublicRoomsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomListRedux);
