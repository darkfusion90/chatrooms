const validator = require('validator')
const isEmpty = require('is-empty')
const logger = require('../utils/logger')('[RegistrationFormValidator] ')

const convertEmptyFieldsToEmptyStrings = (data) => {
    Object.keys(data).forEach(key => {
        data[key] = isEmpty(data[key]) ? "" : data[key];
    })
}

module.exports = (data) => {
    const errors = {}
    logger.debug("Before: ", data)
    convertEmptyFieldsToEmptyStrings(data)
    logger.debug("After: ", data)
}
