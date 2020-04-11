const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')

const POPULATE_CONFIG = {
    user: {
        path: 'user',
        model: 'User',
        select: 'username isRegistered'
    },
    room: {
        path: 'room',
        model: 'Room',
        select: '-__v'
    }
}

const populateQuery = (query) => {
    if (query) {
        const { user, room } = POPULATE_CONFIG
        return query.populate(user).populate(room)
    }
}

const applyProjections = (query) => {
    if (query) {
        return query.select('-__v')
    }
}

const executeQuery = (query, callback) => {
    if (query) {
        const withProjections = applyProjections(query)
        return createPromiseCallbackFunction((resolve, reject) => {
            populateQuery(withProjections).then(resolve).catch(reject)
        }, callback)
    }
}

module.exports = { applyProjections, executeQuery }