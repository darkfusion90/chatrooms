const create = require('./create')
const retrieve = require('./retrieve')
const update = require('./update')
const _delete = require('./delete')

module.exports = { ...create, ...retrieve, ...update, ..._delete }