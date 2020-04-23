const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const POPULATE_CONFIG = {
    room: {
        path: 'room',
        model: 'Room',
        select: 'name'
    },
    requestedBy: {
        path: 'requestedBy',
        model: 'User',
        select: 'username isRegistered'
    }
}

const populateQuery = (query) => {
    const { room, requestedBy } = POPULATE_CONFIG
    return query.populate(room).populate(requestedBy)
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