const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')

const POPULATE_CONFIG = {
    createdBy: {
        path: 'createdBy',
        model: 'User',
        select: 'username isRegistered'
    }
}

const populateFields = (query) => {
    if (query) {
        return query.populate(POPULATE_CONFIG['createdBy'])
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
            populateFields(withProjections).then(resolve).catch(reject)
        }, callback)
    }
}

module.exports = { populateFields, applyProjections, executeQuery }