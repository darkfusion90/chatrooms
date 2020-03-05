const { getUser } = require('../controllers/users')
const addUserToSession = require('../utils/addUserToSession')

module.exports = async (req) => {
    return req.session.userId ? await getUser(req.session.userId) : addUserToSession(req);
}