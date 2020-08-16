const isFunction = require('./isFunction')

/**
 * 
 * @param {Function} executor The executor to be passed to the promise being created
 * @param {any} callback An optional callback which will be called iff it is a function
 * @returns {Promise} The promise created using *executor* and *callback* attached to it if applicable
 */
const createPromiseCallbackFunction = (executor, callback) => {
    const promise = new Promise(executor)

    if (isFunction(callback)) {
        promise.then(v => callback(null, v)).catch(callback)
    }
    return promise
}



module.exports = createPromiseCallbackFunction