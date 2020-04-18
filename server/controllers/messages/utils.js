const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')

const populateQuery = (query) => {
    return query.populate({ path: 'author', model: 'User', select: 'username' })
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