import React from 'react';
import { connect } from 'react-redux'

import RoomList from '../../components/RoomList';
import fetchPublicRooms from '../../actions/fetchPublicRooms'
import { byName } from './sort'

import loggerInit from '../../helpers/logger'

const logger = loggerInit('[RoomListContainer] ')

class RoomListContainer extends React.Component {
    state = { sortRoomListBy: 'name' }

    componentDidMount() {
        this.props.fetchPublicRooms(this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        logger.debug('RoomList fetch fail: ', response)
    }

    sortRoomList = () => {
        const { rooms } = this.props
        if (!rooms) {
            return []
        }

        switch (this.state.sortRoomListBy) {
            case 'name':
                return rooms.sort(byName)
            default:
                return rooms
        }
    }

    render() {
        return <RoomList rooms={this.sortRoomList()} />;
    }
}

const mapStateToProps = (state) => {
    return { rooms: state.rooms }
}

export default connect(mapStateToProps, { fetchPublicRooms })(RoomListContainer);
