import React from 'react';

import RoomList from '../../components/RoomList';
import { getAllRooms, getUser } from '../../server-communication/httpServer'

class RoomListContainer extends React.Component {
    state = { rooms: [], users: {} }

    componentDidMount() {
        getAllRooms(this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        console.log('RoomList fetch fail: ', response)
    }

    onRoomFetchSuccess = (response) => {
        console.log('RoomList fetch success: ', response)
        const rooms = response.data
        rooms.forEach(room => getUser(room.owner, this.onUserFetchSuccess, this.onUserFetchFail))
        this.setState({ rooms: rooms })
    }

    onUserFetchFail = ({ response }) => {
        console.log('User fetch fail: ', response)
    }

    onUserFetchSuccess = (response) => {
        console.log('User fetch success', response)
        const user = response.data
        const usersMap = { [user.userId]: user }
        console.log("user map: ", usersMap)
    }

    render() {
        return <RoomList rooms={this.state.rooms} />;
    }
}

export default RoomListContainer;
