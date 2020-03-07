import React from 'react';

import RoomList from '../../components/RoomList';
import { getAllRooms } from '../../server-communication/httpServer'

const logger = require('../../helpers/logger')('[RoomListContainer]')

class RoomListContainer extends React.Component {
    state = { rooms: [] }

    componentDidMount() {
        getAllRooms(this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        logger.debug('RoomList fetch fail: ', response)
    }

    onRoomFetchSuccess = (response) => {
        logger.debug('RoomList fetch success: ', response)
        this.setState({ rooms: response.data })
    }

    render() {
        return <RoomList rooms={this.state.rooms} />;
    }
}

export default RoomListContainer;
