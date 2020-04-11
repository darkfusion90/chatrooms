const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const populateFields = (query) => {
    if (query) {
        return query.populate({
            path: 'createdBy',
            model: 'User',
            select: 'username isRegistered'
        })
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