import openSocket from 'socket.io-client';

import events from '../constants/serverEventConstants';

class ServerApi {
    socket = openSocket('/', { reconnection: false, autoConnect: false });

    connectToServer = (onConnectionFailed) => {
        this.socket.connect();
        this.socket.on('connect_error', onConnectionFailed);
        this.socket.on('connect', () => console.log("connected"))
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

    createRoom = (roomName, roomType, roomOwner, callback) => {
        return this.socket.emit(events.ROOM_EVENT, events.CREATE_ROOM, roomName, roomType, roomOwner, callback);
    }

    joinRoom = (roomId, callback) => {
        return this.socket.emit(events.ROOM_EVENT, events.JOIN_ROOM, roomId, callback);
    }
}

export default new ServerApi();
