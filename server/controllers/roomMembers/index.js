const create = require('./create')
const retrieve = require('./retrieve')
const _delete = require('./delete')

module.exports = { ...create, ...retrieve, ..._delete }