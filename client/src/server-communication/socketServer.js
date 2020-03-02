import openSocket from 'socket.io-client';
import events from '../constants/serverEventConstants';

const socket = openSocket('/', { autoConnect: false });

export const connectToServer = (onConnectionFailed) => {
    socket.connect();
    socket.on('connect_error', onConnectionFailed);
}

export const onServerConnected = (callback) => {
    socket.on('connect', callback)
}

export const onServerDisconnected = (callback) => {
    socket.on('disconnect', callback)
}

export const registerNewMessageListener = (roomId, callback) => {
    socket.on(events.MESSAGE_EVENT, (...args) => {
        console.log("Message Event: ", args)
        const subEvent = args[0]
        if (subEvent === events.NEW_MESSAGE) {
            const data = args[1]
            if (data.roomId === roomId) {
                callback(data)
            }
        }
    })
}

export const joinRoom = (roomId, callback) => {
    return socket.emit(events.ROOM_EVENT, events.JOIN_ROOM, roomId, callback);
}

export const connectToRoom = (roomId, callback) => {
    return socket.emit(events.ROOM_EVENT, events.CONNECT_TO_ROOM, roomId, callback)
}

export const checkUsername = (username, callback) => {
    return socket.emit(events.USER_EVENT, events.CHECK_USERNAME, username, callback)
}

export const sendMessage = (roomId, messageId) => {
    return socket.emit(events.MESSAGE_EVENT, events.NEW_MESSAGE, roomId, messageId)
}