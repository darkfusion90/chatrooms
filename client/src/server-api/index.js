import openSocket from 'socket.io-client';

import { NEW_MESSAGE_RECIEVED, SEND_MESSAGE, ROOM_JOINED } from './eventTypes';

class ServerApi {
    webSocket = null;

    connectToServer = (url) => {
        this.webSocket = openSocket(url);
    }

    sendMessage = (message) => {
        this.webSocket.emit(SEND_MESSAGE, message);
    }

    onMessageRecieved = (callback) => {
        this.webSocket.on(NEW_MESSAGE_RECIEVED, callback);
    }

    onRoomJoined = (callback) => {
        this.webSocket.on(ROOM_JOINED, callback)
    }
}

export default new ServerApi();
