import React from 'react';
import { connect } from 'react-redux'

import RoomList from './RoomList-View'
import { fetchPublicRooms } from '../../redux/actions/room-actions'
import {
    setSortTechnique,
    setCurrentPageNumber
} from '../../redux/actions/room-list-display-settings-actions'
import { sort as roomSortingTechniques } from './utils'

import loggerInit from '../../helpers/logger'

const logger = loggerInit('[RoomListContainer] ')

class RoomListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPublicRooms(this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        logger.debug('RoomList fetch fail: ', response)
    }

    sortRoomList = () => {
        const { roomListDisplaySettings: { sortBy } } = this.props
        //Copying by value since directly altering the props can create problems in future
        const rooms = [...this.props.rooms]

        if (!rooms) {
            return []
        }

        switch (sortBy) {
            default:
            case 'name-asc':
                return rooms.sort(roomSortingTechniques.byName)
            case 'name-des':
                return rooms.sort(roomSortingTechniques.byName).reverse()
            case 'date-asc':
                return rooms.sort(roomSortingTechniques.byDate)
            case 'date-des':
                return rooms.sort(roomSortingTechniques.byDate).reverse()
        }
    }

    onSortFormSubmit = (formValues) => {
        this.props.setSortTechnique(formValues.sortBy)
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

    render() {
        const { roomListDisplaySettings, setCurrentPageNumber } = this.props
        const sortedRooms = this.sortRoomList()
        const paginatedRooms = this.getPaginatedRoomList(sortedRooms)

        return (
            <RoomList
                totalRooms={sortedRooms}
                roomsToDisplay={paginatedRooms}
                onSortFormSubmit={this.onSortFormSubmit}
                setCurrentPageNumber={setCurrentPageNumber}
                {...roomListDisplaySettings}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: Object.values(state.rooms),
        roomListDisplaySettings: state.roomListDisplaySettings
    }
}

export default connect(
    mapStateToProps,
    { fetchPublicRooms, setSortTechnique, setCurrentPageNumber }
)(RoomListContainer);
