const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const applyProjections = (query) => {
    if (query) {
        return query.select('-__v')
    }
}

const executeQuery = (query, callback) => {
    if (query) {
        return createPromiseCallbackFunction((resolve, reject) => {
            applyProjections(query).then(resolve).catch(reject)
        }, callback)
    }
}

module.exports = { applyProjections, executeQuery }