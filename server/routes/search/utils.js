const users = require('../../controllers/users')
const roomMembers = require('../../controllers/roomMembers')
const { genericHandlerCallback } = require('../routeUtils')
const escapeRegex = require('../../utils/escapeRegex')


const searchUsers = (req, res) => {
    const searchQuery = escapeRegex(req.query.query)

    users.searchUsers(searchQuery, (err, searchResult) => {

        if (searchResult) {
            return res.json({
                length: searchResult.length,
                payload: searchResult
            })
        }
        genericHandlerCallback(err, searchResult, res)
    })
}

const searchRoomMembers = (req, res) => {
    const { roomId, userId } = req.query

    roomMembers.searchUserInRoom(roomId, userId, (err, searchResult) => {
        if (searchResult) {
            return res.json({
                length: searchResult.length,
                payload: searchResult
            })
        }
        genericHandlerCallback(err, searchResult, res)
    })
}

module.exports = { searchUsers, searchRoomMembers }