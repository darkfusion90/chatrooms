const createPromiseCallback = require('../../../utils/promiseCallbackFunction')


const populateQuery = (query) => {
    return query.populate({
        path: 'user',
        model: 'User',
        select: 'username isRegistered'
    })
}

const executeQuery = (query, callback) => {
    if (query) {
        return createPromiseCallback((resolve, reject) => {
            populateQuery(query).then(resolve, reject)
        }, callback)
    }
}

module.exports = { executeQuery }