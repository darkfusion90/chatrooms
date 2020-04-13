import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'

import RoomList from './RoomList-View'
import {
    fetchPublicRooms,
    updateTotalPublicRoomsCount
} from '../../redux/actions/room-actions'
import {
    setSortTechnique,
    setCurrentPageNumber,
    setSearchQuery,
    setItemsPerPage
} from '../../redux/actions/room-list-display-settings-actions'
import isEmpty from 'is-empty';


class RoomListRedux extends React.Component {
    componentDidMount() {
        this.refreshStore()
    }

    componentDidUpdate(prevProps) {
        const { roomListDisplaySettings: prevDisplaySettings } = prevProps
        const { roomListDisplaySettings: currentDisplaySettings } = this.props

        if (!_.isEqual(prevDisplaySettings, currentDisplaySettings)) {
            this.refreshStore()
        }
    }

    refreshStore = () => {
        this.props.updateTotalPublicRoomsCount()
        this.props.fetchPublicRooms(this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        console.log('RoomList fetch fail: ', response)
    }

    onDisplayControlsFormSubmit = ({ sortBy, itemsPerPage }) => {
        this.props.setSortTechnique(sortBy)
        this.props.setItemsPerPage(Math.min(itemsPerPage, this.props.countTotalPublicRooms))
    }

    onSearchFieldInputChange = (e) => {
        this.props.setSearchQuery(e.target.value)
    }

    getSearchQuery = () => {
        const { roomListDisplaySettings: { searchQuery } } = this.props
        return searchQuery && searchQuery.toLowerCase().trim()
    }

    render() {
        const {
            rooms,
            countTotalPublicRooms,
            roomListDisplaySettings,
            setCurrentPageNumber
        } = this.props

        const searchQuery = this.getSearchQuery()

        return (
            <RoomList
                countTotalPublicRooms={countTotalPublicRooms}
                rooms={rooms}
                isSearchResult={!isEmpty(searchQuery)}
                onDisplayControlsFormSubmit={this.onDisplayControlsFormSubmit}
                onSearchFieldInputChange={this.onSearchFieldInputChange}
                setCurrentPageNumber={setCurrentPageNumber}
                {...roomListDisplaySettings}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        rooms: { rooms, countTotalPublicRooms },
        roomListDisplaySettings
    } = state

    return {
        rooms: Object.values(rooms),
        countTotalPublicRooms,
        roomListDisplaySettings,
    }
}

const mapDispatchToProps = ({
    fetchPublicRooms,
    updateTotalPublicRoomsCount,
    setSortTechnique,
    setCurrentPageNumber,
    setSearchQuery,
    setItemsPerPage
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomListRedux);
