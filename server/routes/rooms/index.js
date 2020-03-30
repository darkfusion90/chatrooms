const { get, post, patch, _delete } = require('./rooms')
const roomMessages = require('./roomMessages')
const roomMembers = require('./roomMembers')

module.exports = {
    get,
    post,
    patch,
    _delete,
    messages: roomMessages,
    members: roomMembers
}