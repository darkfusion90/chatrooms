import openSocket from 'socket.io-client';

import {
    NEW_MESSAGE_RECIEVED,
    SEND_MESSAGE,
    ROOM_JOINED,
    CREATE_ROOM,
    USER_ID_RECIEVE,
    JOIN_ROOM,
    ROOM_JOIN_REQUEST,
    ROOM_JOIN_PERMISSION_RECIEVE
} from '../constants/server_event_constants'

class ServerApi {
    socket = openSocket("http://localhost:8000", {reconnection: false, autoConnect: false});

    connectToServer = (url, onConnectionFailed) => {
        this.socket.connect();
        this.socket.on('connect_error', onConnectionFailed);
        this.socket.on('connect', ()=>console.log("connected"))
    }

    sendMessage = (message) => {
        this.socket.emit(SEND_MESSAGE, message);
    }

    onMessageRecieved = (callback) => {
        this.socket.on(NEW_MESSAGE_RECIEVED, callback);
    }

    onRoomJoined = (callback) => {
        this.socket.on(ROOM_JOINED, callback)
    }

    onRoomJoinRequestRecieved = (callback) => {
        this.socket.on(ROOM_JOIN_REQUEST, callback);
    }

    onRoomJoinPermissionRecieved = (callback) => {
        this.socket.on(ROOM_JOIN_PERMISSION_RECIEVE, callback);
    }

    onUserIdRecieved = (callback) => {
        this.socket.on(USER_ID_RECIEVE, callback);
    }

    createRoom = (roomName, roomType, roomOwner, callback) => {
        return this.socket.emit(CREATE_ROOM, roomName, roomType, roomOwner, callback);
    }

    joinRoom = (roomId, callback) => {
        return this.socket.emit(JOIN_ROOM, roomId, callback);
    }
}

export default new ServerApi();
