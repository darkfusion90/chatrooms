const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const RoomSchema = Schema({
    room_id: String,
    name: String,
    type: {
        type: String,
        enum: ['private', 'public', 'unlisted']
    },
    owner: String
})

const Room = mongoose.model("Room", RoomSchema);
Room.on('index', (err) => {
    if(err){
        console.log("error!")
    }
    else{
        console.log("no error :)")
    }
})

module.exports = Room;