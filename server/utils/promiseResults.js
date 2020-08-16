const resolveNoData = (callback) => {
    callback(null, null)

    return Promise.resolve(null)
}

module.exports = { resolveNoData }
