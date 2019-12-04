import openSocket from 'socket.io-client';

import { NEW_MESSAGE_RECIEVED, SEND_MESSAGE, ROOM_JOINED, CREATE_ROOM, USER_ID_RECIEVE } from './eventTypes';

class ServerApi {
    socket = null;

    connectToServer = (url) => {
        this.socket = openSocket(url);
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

    onUserIdRecieved = (callback) => {
        this.socket.on(USER_ID_RECIEVE, callback);
    }

    createRoom = (roomName, roomType, roomOwner, callback) => {
        return this.socket.emit(CREATE_ROOM, roomName, roomType, roomOwner, callback);
    }
}

export default new ServerApi();
