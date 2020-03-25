import React from 'react';
import { connect } from 'react-redux'

import RoomList from './RoomList-View'
import { fetchPublicRooms } from '../../redux/actions/room-actions'
import { setRoomListSortTechnique } from '../../redux/actions/room-list-sort-technique-actions'
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
        const { rooms, roomListSortTechnique } = this.props
        if (!rooms) {
            return []
        }

        switch (roomListSortTechnique) {
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
        this.props.setRoomListSortTechnique(formValues.sortBy)
    }

    render() {
        return (
            <RoomList
                rooms={this.sortRoomList()}
                onSortFormSubmit={this.onSortFormSubmit}

            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: Object.values(state.rooms),
        roomListSortTechnique: state.roomListSortTechnique
    }
}

export default connect(
    mapStateToProps,
    { fetchPublicRooms, setRoomListSortTechnique }
)(RoomListContainer);
