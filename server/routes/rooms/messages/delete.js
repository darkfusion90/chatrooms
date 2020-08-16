const { deleteMessage } = require('../../../controllers/messages')

const _delete = (req, res) => {
    const { messageId } = req.params
    deleteMessage(messageId, (err, room) => genericHandlerCallback(err, room, res))
}

module.exports = _delete