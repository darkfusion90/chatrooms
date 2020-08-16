const { get, post, patch, _delete } = require('./rooms')
const messages = require('./messages')
const roomMembers = require('./roomMembers')


module.exports = {
    get,
    post,
    patch,
    _delete,
    messages,
    members: roomMembers
}