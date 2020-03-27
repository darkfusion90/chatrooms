import React from 'react';
import { connect } from 'react-redux'

import RoomList from './RoomList-View'
import { fetchPublicRooms } from '../../redux/actions/room-actions'
import {
    setSortTechnique,
    setCurrentPageNumber,
    setSearchQuery
} from '../../redux/actions/room-list-display-settings-actions'
import { sort as roomSortingTechniques } from './utils'

import loggerInit from '../../helpers/logger'
import isEmpty from 'is-empty';

const logger = loggerInit('[RoomListContainer] ')

class RoomListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPublicRooms(this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        logger.debug('RoomList fetch fail: ', response)
    }

    getSortedRoomList = (rooms) => {
        const { roomListDisplaySettings: { sortBy } } = this.props

        if (!rooms) {
            return []
        }

        switch (sortBy) {
            case 'name-des':
                return rooms.sort(roomSortingTechniques.byName).reverse()
            case 'date-asc':
                return rooms.sort(roomSortingTechniques.byDate)
            case 'date-des':
                return rooms.sort(roomSortingTechniques.byDate).reverse()
            case 'name-asc':
            default:
                return rooms.sort(roomSortingTechniques.byName)
        }
    }

    onSortFormSubmit = (formValues) => {
        this.props.setSortTechnique(formValues.sortBy)
    }

    onSearchFieldInputChange = (e) => {
        this.props.setSearchQuery(e.target.value)
    }

    getPaginatedRoomList = (sortedRooms) => {
        const { roomListDisplaySettings: { itemsPerPage, currentPageNumber } } = this.props
        if (sortedRooms.length <= itemsPerPage) {
            return sortedRooms
        }

        //Page numbers are 1-indexed (1, 2, 3...) whereas array is 0-indexed (0, 1, 2...)
        //So to make 1-indexed page number applicable while indexing array, 
        //we subtract 1 from the page number
        const offset = itemsPerPage * (currentPageNumber - 1);
        const to = Math.min(offset + itemsPerPage, sortedRooms.length)
        return sortedRooms.slice(offset, to)
    }

    getSearchQuery = () => {
        const { roomListDisplaySettings: { searchQuery } } = this.props
        return searchQuery && searchQuery.toLowerCase().trim()
    }

    filterRoomListBySearchQuery = (roomList, searchQuery) => {
        if (searchQuery) {
            return roomList.filter(room => {
                const roomName = room && room.name
                return roomName && roomName.toLowerCase().includes(searchQuery)
            })
        }

        return roomList
    }

    getRooms = (searchQuery) => {
        const rooms = [...this.props.rooms]
        return this.getSortedRoomList(this.filterRoomListBySearchQuery(rooms, searchQuery))
    }

    render() {
        const {
            roomListDisplaySettings,
            setCurrentPageNumber
        } = this.props

        const searchQuery = this.getSearchQuery()
        const rooms = this.getRooms(searchQuery)
        const paginatedRooms = this.getPaginatedRoomList(rooms)

        return (
            <RoomList
                totalRooms={rooms}
                roomsToDisplay={paginatedRooms}
                isSearchResult={!isEmpty(searchQuery)}
                onSortFormSubmit={this.onSortFormSubmit}
                onSearchFieldInputChange={this.onSearchFieldInputChange}
                setCurrentPageNumber={setCurrentPageNumber}
                {...roomListDisplaySettings}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: Object.values(state.rooms),
        roomListDisplaySettings: state.roomListDisplaySettings,
    }
}

export default connect(
    mapStateToProps,
    { fetchPublicRooms, setSortTechnique, setCurrentPageNumber, setSearchQuery }
)(RoomListContainer);
