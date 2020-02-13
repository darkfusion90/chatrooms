import openSocket from 'socket.io-client';
import axios from 'axios';

import events from '../constants/serverEventConstants';

class ServerApi {
    socket = openSocket('/', { autoConnect: false });

    connectToServer = (onConnectionFailed) => {
        this.socket.connect();
        this.socket.on('connect_error', onConnectionFailed);
    }

    onServerConnected = (callback) => {
        this.socket.on('connect', callback)
    }

    onServerDisconnected = (callback) => {
        this.socket.on('disconnect', callback)
    }

    sendMessage = (message) => {
        this.socket.emit(events.SEND_MESSAGE, message);
    }

    onMessageRecieved = (callback) => {
        this.socket.on(events.NEW_MESSAGE_RECIEVED, callback);
    }

    onRoomJoined = (callback) => {
        //this.socket.on(events.ROOM_EVENT, ROOM_JOINED, callback)
    }

    onRoomJoinRequestRecieved = (callback) => {
        //this.socket.on(events.ROOM_EVENT, ROOM_JOIN_REQUEST, callback);
    }

    onRoomJoinPermissionRecieved = (callback) => {
        this.socket.on(events.ROOM_EVENT, events.ROOM_JOIN_PERMISSION_RECIEVE, callback);
    }

    onUserIdRecieved = (callback) => {
        this.socket.on(events.USER_ID_RECIEVE, callback);
    }

    createRoom = (roomName, roomType, callback) => {
        return this.socket.emit(events.ROOM_EVENT, events.CREATE_ROOM, roomName, roomType, callback);
    }

    joinRoom = (roomId, callback) => {
        return this.socket.emit(events.ROOM_EVENT, events.JOIN_ROOM, roomId, callback);
    }

    loginUser = (username, password, onRequestFulfilled, onRequestRejected) => {
        axios.post('/api/login',
            { username, password },
            { withCredentials: true }
        ).then(onRequestFulfilled, onRequestRejected)
    }

    logoutUser = (onRequestFulfilled, onRequestRejected) => {
        axios.post('/api/logout', {}, { withCredentials: true }).then(onRequestFulfilled, onRequestRejected);
    }

    fetchUserInfo = (onRequestFulfilled, onRequestRejected) => {
        axios.get('/api/user_info', { withCredentials: true }).then(onRequestFulfilled, onRequestRejected);
    }
}

export default new ServerApi();
