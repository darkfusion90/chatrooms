const io = require('socket.io')();
const roomManager = require('./roomManager');


/*Consider using one of the following fonts: Ubuntu, Open-Sans, Roboto, Oxygen, Lato*/

io.on('connection', (client) => {
    const permanentId = client.id;

    client.emit("USER_ID_RECIEVE", permanentId);

    client.on('SEND_MESSAGE', (roomId, message) => {
        io.sockets.in(client.rooms[roomId]).emit("NEW_MESSAGE_RECIEVED", { message: message, senderId: client.id });
    })

    client.on('CREATE_ROOM', (roomName, roomType, roomOwner, callback) => {
        const room = roomManager.createRoom(roomName, roomType, roomOwner);
        callback({
            status: 200,
            room: room
        });
        console.log(room);
    })

    client.on('JOIN_ROOM', (roomName, roomType, roomOwner, callback) => {
        const room = roomManager.createRoom(roomName, roomType, roomOwner);
        callback({
            status: 200,
            room: room
        });
        console.log(room);
    })
})

io.listen(8000);