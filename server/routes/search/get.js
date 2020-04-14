const { searchUsers, searchRoomMembers } = require('./utils')
const { RESOURCE_NOT_FOUND } = require('../../constants/httpStatusCodes')

const get = (req, res) => {
    const { category } = req.query

    switch (category) {
        case 'user':
            return searchUsers(req, res)
        case 'room_member':
            return searchRoomMembers(req, res)
        default:
            res.status(RESOURCE_NOT_FOUND).json({ 'category': 'Category not supported' })
    }
}

module.exports = get