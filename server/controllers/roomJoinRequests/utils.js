const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const applyProjections = (query) => {
    if (query) {
        return query.select('-__v')
    }
}

const executeQuery = (query, callback) => {
    if (query) {
        const withProjections = applyProjections(query)
        return createPromiseCallbackFunction((resolve, reject) => {
            withProjections.then(resolve).catch(reject)
        }, callback)
    }
}

module.exports = { applyProjections, executeQuery }