import React from 'react';
import { connect } from 'react-redux'

import RoomList from '../../components/RoomList';
import fetchPublicRooms from '../../actions/fetchPublicRooms'

import loggerInit from '../../helpers/logger'

const logger = loggerInit('[RoomListContainer] ')

class RoomListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPublicRooms(this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        logger.
        logger.debug('RoomList fetch fail: ', response)
    }

    render() {
        console.log(this.props.rooms)
        return <RoomList rooms={this.props.rooms} />;
    }
}

const mapStateToProps = (state) => {
    return { rooms: state.rooms }
}

export default connect(mapStateToProps, { fetchPublicRooms })(RoomListContainer);
