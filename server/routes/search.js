const users = require('../controllers/users')
const { genericHandlerCallback } = require('./routeUtils')
const escapeRegex = require('../utils/escapeRegex')
const { RESOURCE_NOT_FOUND } = require('../constants/httpStatusCodes')

const get = (req, res) => {
    const { category, query } = req.query

    console.log({ category, query })

    switch (category) {
        case 'user':
            users.searchUsers(escapeRegex(query), (err, searchResult) => {
                if (searchResult) {
                    console.log('searchResult: ', searchResult)
                    return res.json({
                        length: searchResult.length,
                        payload: searchResult
                    })
                }
                genericHandlerCallback(err, searchResult, res)
            })
            break;
        default:
            res.status(RESOURCE_NOT_FOUND).json({ 'category': 'Category not supported' })
    }
}

module.exports = { get }