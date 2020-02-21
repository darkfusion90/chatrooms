import React from 'react';

import RoomList from '../../components/RoomList';
import { getAllRooms } from '../../server-communication/httpServer'

class RoomListContainer extends React.Component {
    state = { rooms: [] }

    componentDidMount() {
        getAllRooms(this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    onRoomFetchFail = (reason) => {
        console.log('RoomList fetch fail: ', reason.response)
    }

    onRoomFetchSuccess = (response) => {
        console.log('RoomList fetch success: ', response)
        this.setState({ rooms: response.data })
    }

    render() {
        return <RoomList rooms={this.state.rooms} />;
    }
}

export default RoomListContainer;
