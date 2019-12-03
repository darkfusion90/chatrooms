const io = require('socket.io')();

const generateRoom = require('./roomGenerator');
console.log(generateRoom());
/*Consider using one of the following fonts: Ubuntu, Open-Sans, Roboto, Oxygen, Lato*/

function handleMessageBroadcasts(client) {
   
}

io.on('connection', (client) => {
    const randomRoom = generateRoom();
    client.join(randomRoom);
    client.emit('ROOM_JOINED', randomRoom);

    client.on('SEND_MESSAGE', (roomId, message) => {
        io.sockets.in(client.rooms[roomId]).emit("NEW_MESSAGE_RECIEVED", { message: message, senderId: client.id });
    })
})

io.listen(8000);