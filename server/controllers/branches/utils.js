const wrapCallback = require('../../utils/promiseCallbackFunction')

const POPULATE_CONFIG = {
    room: {
        path: 'room',
        model: 'Room',
        select: '-__v'
    }
}

const populateFields = (query) => query.populate(POPULATE_CONFIG['room'])

const executeQuery = (query, callback) => wrapCallback((resolve, reject) => {
    populateFields(query.select('-__v')).then(resolve).catch(reject)
}, callback)

module.exports = { executeQuery, POPULATE_CONFIG }