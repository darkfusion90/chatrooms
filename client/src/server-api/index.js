import openSocket from 'socket.io-client';

import {
    NEW_MESSAGE_RECIEVED,
    SEND_MESSAGE,
    CREATE_ROOM,
    USER_ID_RECIEVE,
    JOIN_ROOM,
    ROOM_JOIN_PERMISSION_RECIEVE
} from '../constants/serverEventConstants'

const SOCKET_IO_URL = process.env.NODE_ENV === 'production' ? "https://websockets-chatrooms.herokuapp.com" : "http://localhost:8000"
console.log("node env: "+process.env.NODE_ENV)
class ServerApi {
    socket = openSocket(SOCKET_IO_URL, { reconnection: false, autoConnect: false });

    connectToServer = (onConnectionFailed) => {
        this.socket.connect();
        this.socket.on('connect_error', onConnectionFailed);
        this.socket.on('connect', () => console.log("connected"))
    }

    sendMessage = (message) => {
        this.socket.emit(SEND_MESSAGE, message);
    }

    onMessageRecieved = (callback) => {
        this.socket.on(NEW_MESSAGE_RECIEVED, callback);
    }

    onRoomJoined = (callback) => {
        //this.socket.on(ROOM_JOINED, callback)
    }

    onRoomJoinRequestRecieved = (callback) => {
        //this.socket.on(ROOM_JOIN_REQUEST, callback);
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
