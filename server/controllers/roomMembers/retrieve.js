const RoomMember = require('../../models/RoomMember')
const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')
const { executeQuery, POPULATE_CONFIG } = require('./utils')
const roomController = require('../rooms/utils');


const getRoomMemberHavingUserId = (roomId, userId, callback) => {
    const query = RoomMember.findOne({ room: roomId, user: userId })

    return executeQuery(query, callback)
}

const getAllMembersOfRoom = (roomId, callback) => {
    const query = RoomMember.find({ room: roomId })

    return executeQuery(query, callback)
}

const getRoomMember = (memberId, roomId, callback) => {
    const query = RoomMember.findOne({ _id: memberId, room: roomId })

    return executeQuery(query, callback)
}

const searchUserInRoom = (roomId, userId, callback) => {
    const query = RoomMember.find({ room: roomId, user: userId })

    return executeQuery(query, callback)
}

const getAllRoomsHavingUser = (userId, callback) => {
    let query = RoomMember.find(
        { user: userId },
        'room -_id',
    ).populate(POPULATE_CONFIG['room'])

    query = roomController.populateFields(query)

    // The actual output of the query is: 
    // {
    //   "rooms": [
    //      {
    //          "room": {
    //           "_id": "remember-oldest-frame-food",
    //           "name": "The Mystical Room",
    //           "type": "public",
    //           "createdBy": "5e64e979f7a63e19e7bfc2eb",
    //           "createdAt": "2020-04-17T14:15:04.770Z"
    //           } 
    //       }
    //    ]
    //  },
    // The following routine removes the redundant "room" inside the array 
    // and extracts the actual room meta that is required
    // 
    // Final Output:
    // {
    //      "rooms": [
    //          {
    //          "_id": "remember-oldest-frame-food",
    //          "name": "The Mystical Room",
    //          "type": "public",
    //          "createdBy": "5e64e979f7a63e19e7bfc2eb",
    //          "createdAt": "2020-04-17T14:15:04.770Z"
    //           } 
    //       ]
    //  },

    return createPromiseCallbackFunction((resolve, reject) => {
        query.then(rooms => {
            const _rooms = rooms.map(room => room['room']);
            resolve(_rooms)
        }).catch(reject)
    }, callback);
}

module.exports = {
    getRoomMemberHavingUserId,
    getAllRoomsHavingUser,
    getAllMembersOfRoom,
    getRoomMember,
    searchUserInRoom
}