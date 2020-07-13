const createPromiseCallbackFunction = require('../utils/promiseCallbackFunction')

const getUpdatableFieldsFromData = (data, updatableFields = []) => {
    const refinedData = {}

    updatableFields.forEach(field => {
        if (data[field]) {
            refinedData[field] = data[field]
        }
    })

    return refinedData
}

const saveDocument = (doc, callback) => {
    if(!doc){
        return
    }

    return createPromiseCallbackFunction((resolve, reject) => {
        doc.save().then(resolve, reject)
    }, callback)
}

module.exports = { getUpdatableFieldsFromData, saveDocument }