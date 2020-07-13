const createPromiseCallback = require('../../../utils/promiseCallbackFunction')


const configUserPopulation = {
    model: 'User',
    select: 'username isRegistered'
}

const POPULATE_CONFIG = {
    victim: {
        path: 'victim',
        ...configUserPopulation
    },
    whoKicked: {
        path: 'whoKicked',
        ...configUserPopulation
    },
}

const populateQuery = (query) => {
    const { victim, whoKicked } = POPULATE_CONFIG

    return query.populate(whoKicked).populate(victim)
}

const executeQuery = (query, callback) => {
    if (query) {
        return createPromiseCallback((resolve, reject) => {
            populateQuery(query).then(resolve, reject)
        }, callback)
    }
}

module.exports = { executeQuery }