import React from 'react';
import { connect } from 'react-redux'

import RoomList from '../../components/RoomList';
import RoomListControlsHeader from './RoomListControlsHeader'
import fetchPublicRooms from '../../actions/fetchPublicRooms'
import setRoomListSortTechnique from '../../actions/setRoomListSortTechnique'
import { byName, byDate } from './sort'

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
                return rooms.sort(byName)
            case 'name-des':
                return rooms.sort(byName).reverse()
            case 'date-asc':
                return rooms.sort(byDate)
            case 'date-des':
                return rooms.sort(byDate).reverse()
        }
    }

    onSortFormSubmit = (formValues) => {
        this.props.setRoomListSortTechnique(formValues.sortBy)
    }

    render() {
        const { rooms } = this.props
        return (
            <>
                {rooms && rooms.length !== 0 &&
                    <RoomListControlsHeader onSortFormSubmit={this.onSortFormSubmit} />}
                <RoomList rooms={this.sortRoomList()} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { rooms: state.rooms, roomListSortTechnique: state.roomListSortTechnique }
}

export default connect(mapStateToProps, { fetchPublicRooms, setRoomListSortTechnique })(RoomListContainer);
