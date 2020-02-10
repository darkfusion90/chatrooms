const validator = require('validator')
const isEmpty = require('is-empty')

const convertEmptyFieldsToEmptyStrings = (data) => {
    Object.keys(data).forEach(key => {
        data[key] = isEmpty(data[key]) ? "" : data[key];
    })
}

module.exports = (data) => {
    const errors = {}
    console.log("Before: ", data)
    convertEmptyFieldsToEmptyStrings(data)
    console.log("After: ", data)
}
